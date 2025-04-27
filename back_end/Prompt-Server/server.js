const express = require('express');
const app = express();
const { OpenAI } = require('openai');
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const mongoose = require('mongoose');

const port = process.env.PORT || 3000;
app.use(express.json());

console.log(process.env.MONGO_URL);
try {
    mongoose.connect(process.env.MONGO_URL);
    console.log('MongoDB connected successfully');
} catch (err) {
    console.log('MongoDB connection failed:', err.message);
    process.exit(1);
}

const chatDialogSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true,
        unique: true,
    },
    chatId: {
        type: String,
        required: true,
    },
    chatTitle: {
        type: String,
        required: true,
    }
});
const chatHistorySchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true,
        unique: true,
    },
    chatId: {
        type: String,
        required: true,
        unique: true,
    },
    history: {
        type: JSON,
        required: true,
    }
});
const userInfoSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true,
        unique: true,
    },
    type: {
        type: String,
        required: true,
    },
    info: {
        type: JSON,
        required: true,
    }
});
const chatDialog = mongoose.model('ChatDialog', chatDialogSchema);
const ChatHistory = mongoose.model('ChatHistory', chatHistorySchema);
const UserInfo = mongoose.model('UserInfo', userInfoSchema);

// Create chat history global variable to cache chat history for each user
let chatHistory = new Map();

// Get a user's apple watch info as a json object
app.post('/user-info-watch', async (req, res) => {
    const { uid, data } = req.body;
    if (!uid || !data) {
        return res.status(400).json({ error: 'User ID and type are required' });
    }

    let type = 'watch';
    let userInfo = await UserInfo.find({ uid: uid, type: type });
    if (!userInfo) {
        UserInfo = new UserInfo({
            uid: uid,
            type: type,
            info: data
        });
    } else {
        userInfo = await UserInfo.findOneAndUpdate({ uid: uid, type: type }, { info: data });
    }
    await userInfo.save();
    res.json({ message: 'User info saved successfully' });
});

// Get a user's document info as pdf file
app.post('/user-info-document', async (req, res) => {
    const uid = req.body.uid;
    const file = req.file;
    if (!uid || !file) {
        return res.status(400).json({ error: 'User ID and type are required' });
    }

    let type = 'document';
    const uploadedFile = await openai.files.create({
        file: fs.createReadStream(file.path),
        purpose: 'user_info'
    });
    const data = await openai.responses.create({
        model: 'gpt-4o',
        input: [
            {
                role: 'user',
                content: [
                    {
                        type: 'input_file',
                        file_id: uploadedFile.id,
                    },
                    {
                        type: 'input_text',
                        text: 'Please extract the user info from this document and return it as a JSON object.',
                    }
                ]
            }
        ]
    });
    let userInfo = new UserInfo({
        uid: uid,
        type: type,
        info: data
    });
    await userInfo.save();
    res.json({ message: 'User info saved successfully' });
});

app.post('/new-chat', async (req, res) => {
    // const { health_data } = req.body;
    // if (!health_data) {
    //     return res.status(400).json({ error: 'Data is required' });
    // }

    // Get info field from userinfo db
    const { uid } = req.body;
    if (!uid) {
        return res.status(400).json({ error: 'User ID is required' });
    }
    let health_info = await UserInfo.find({ uid: uid, type: 'watch' });
    const health_data = health_info.map(info => info.info);

    const system_initial = 'You are a wellbeing coach, you will receive health data ' +
    'from user and you will evaluate their health condition and recent activities. ' +
    'Your job is to first reflect on the user\'s current health condition, and then ' +
    'answer their questions. Act concisely and politely with sympathy.\n' +
    'The user wants to be called by their nickname. If they don\'t have a nickname, ' +
    'call them by their real name.\n' +
    'First, greet the user and reflect on their recent health status!';


    try {
        const stream = await openai.chat.completions.create({
            model: 'gpt-4o',
            stream: true,
            messages: [
                { role: 'system', content: system_initial },
                { role: 'user', content: health_data }
            ]
        });

        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');

        for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content;
            if (content) {
                res.write(content);
            }
        }

        res.end();
    } catch (error) {
        console.error('OpenAI API error:', error);
        res.status(500).json({ error: 'Failed to generate response' });
    }
});

app.post('/chat', async (req, res) => {
    const { uid, chatId, prompt } = req.body;
    if (!uid || !chatId || !prompt) {
        return res.status(400).json({ error: 'User ID, chat ID, and prompt are required' });
    }
    // Fetch user info from MongoDB, get all the data
    let userInfo;
    try {
        userInfo = await UserInfo.find({ uid: uid });
        if (!userInfo) {
            return res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('MongoDB error:', error);
        return res.status(500).json({ error: 'Failed to fetch user info' });
    }
    // If userInfo is an array, we want to append all the info together
    if (Array.isArray(userInfo)) {
        userInfo = userInfo.map(info => info.info).join('\n');
    } else {
        userInfo = userInfo.info;
    }

    // Add new prompt to chat history
    if (chatHistory.get(uid)) {
        // If chat history exists, append the new prompt
        chat_history = chatHistory.get(uid);
        chat_history.push({ role: 'user', content: prompt });
    } else {
        chatHistory = [{ role: 'user', content: prompt }];
    }

    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                { role: 'chat', content: chatHistory },
                { role: 'data', content: userInfo},
            ]
        });
        // Add new response to chat history
        chatHistory.push({ role: 'assistant', content: completion.choices[0].message.content });
        // Save chat history to MongoDB
        const chatHistoryEntry = new ChatHistory({
            uid: uid,
            chatId: chatId,
            history: chatHistory
        });
        await chatHistoryEntry.save();
        res.json({ response: completion.choices[0].message.content });
    } catch (error) {
        console.error('OpenAI API error:', error);
        res.status(500).json({ error: 'Failed to generate response' });
    }
});

app.get('/chat', async (req, res) => {
    const { appleId, chatId } = req.query;
    if (!appleId || !chatId) {
        return res.status(400).json({ error: 'Apple ID is required' });
    }

    // Fetch chat history from MongoDB and store in chatHistory global variable
    try {
        chatHistory = await ChatHistory.find({ appleId: appleId, chatId: chatId });
        if (!chatHistory) {
            return res.status(404).json({ error: 'Chat history not found' });
        }
    } catch (error) {
        console.error('MongoDB error:', error);
        return res.status(500).json({ error: 'Failed to fetch chat history' });
    }
    res.json({ chatHistory: chatHistory });
});


app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on port ${port}`);
});
