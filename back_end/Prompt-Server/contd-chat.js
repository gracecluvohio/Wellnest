const { OpenAI } = require('openai');
const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// const system_initial = 'You are a wellbeing coach, you will receive health data ' +
//     'from user and you will evaluate their health condition and recent activities. ' +
//     'You job is to first reflect on the user\'s current health condition, and then ' +
//     'answer their questions. Act concisely and politely with sympathy.\n' +
//     'The user wants to called by their nickname. If they donnot have a nickname, ' +
//     'call them by their real name.\n' +
//     'First, greet the user and reflect on their recent health status!'

app.use(express.json());

const mongoose = require('mongoose');
const chatHistorySchema = new mongoose.Schema({
    appleId: {
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
    appleId: {
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
const UserInfo = mongoose.model('UserInfo', userInfoSchema);
const ChatHistory = mongoose.model('ChatHistory', chatHistorySchema);

// Create chat history global variable to store chat history
let chatHistory = null;

app.post('/chat', async (req, res) => {
    const { appleId, chatId, prompt } = req.body;
    if (!appleId || !chatId || !prompt) {
        return res.status(400).json({ error: 'Apple ID, chat ID, and prompt are required' });
    }
    // Fetch user info from MongoDB, get all the data
    let userInfo;
    try {
        userInfo = await UserInfo.find({ appleId: appleId });
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
    if (chatHistory) {
        chatHistory.push({ role: 'user', content: prompt });
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
            appleId: appleId,
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

// Get a user's apple watch info as a json object
app.post('/user-info-watch', async (req, res) => {
    const { appleId, data } = req.body;
    if (!appleId || !data) {
        return res.status(400).json({ error: 'Apple ID and type are required' });
    }

    let type = 'watch';
    let userInfo = await UserInfo.find({ appleId: appleId, type: type });
    if (!userInfo) {
        UserInfo = new UserInfo({
            appleId: appleId,
            type: type,
            info: data
        });
    } else {
        userInfo = await UserInfo.findOneAndUpdate({ appleId: appleId, type: type }, { info: data });
    }
    await userInfo.save();
    res.json({ message: 'User info saved successfully' });
});

// Get a user's document info as pdf file
app.post('/user-info-document', async (req, res) => {
    const appleId = req.body.appleId;
    const file = req.file;
    if (!appleId || !file) {
        return res.status(400).json({ error: 'Apple ID and type are required' });
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
        appleId: appleId,
        type: type,
        info: data
    });
    await userInfo.save();
    res.json({ message: 'User info saved successfully' });
});


app.listen(port, '0.0.0.0', () => {
    console.log(`Prompt server listening on port ${port}`);
});