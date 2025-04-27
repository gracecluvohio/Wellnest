const express = require('express');
const app = express();
const { OpenAI } = require('openai');
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
const fs = require('fs');
const multer = require('multer');
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/');  // The 'uploads' folder where files will be stored
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + path.extname(file.originalname));  // Use timestamp to ensure unique file names
//     }
// });

// const upload = multer({ storage: storage });
// Ensure uploads saves file as pdf
const path = require('path');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');  // The 'uploads' folder where files will be stored
    }
    ,
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));  // Use timestamp to ensure unique file names
    }
});
// Ensure uploads saves file as pdf
const upload = multer({ storage: storage, fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== '.pdf') {
        return cb(new Error('Only pdf files are allowed'));
    }
    cb(null, true);
}});
// const upload = multer({ dest: 'uploads/' });
// const upload = multer({ dest: 'uploads/' });
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
    },
    // chatId: {
    //     type: Number,
    //     required: true,
    //     // incremental
    //     default: function() {
    //         return mongoose.model('ChatDialog').countDocuments().exec().then(count => count + 1);
    //     }
    // },
    chatTitle: {
        type: String,
        required: true,
    }
});
const chatHistorySchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true,
    },
    chatId: {
        type: String,
        required: true,
    },
    history: {
        type: Array,
        required: true,
    }
});
const userInfoSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    info: {
        type: Array,
        required: true,
    }
});
const ChatDialog = mongoose.model('ChatDialog', chatDialogSchema);
const ChatHistory = mongoose.model('ChatHistory', chatHistorySchema);
const UserInfo = mongoose.model('UserInfo', userInfoSchema);

let user_data = new UserInfo({
    uid: 'reet0512',
    type: 'watch',
    info: [
        {
            date: '2023-10-01',
            heartRate: 70, 
            steps: 10000,
            sleep: 8,
            calories: 500,
            weight: 70,
            bloodPressure: {
                systolic: 120,
                diastolic: 80
            },
            bloodSugar: 90,
            cholesterol: {
                hdl: 50,
                ldl: 100,
                triglycerides: 150
            },
        }
    ]
});
user_data.save();



app.get('/inspire-text', async (req, res) => {
    const { uid } = req.body;
    if (!uid) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    let userInfo;
    try {
        userInfo = await UserInfo.find({ uid: uid });
        console.log('userInfo:', userInfo);
        if (!userInfo) {
            return res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('MongoDB error:', error);
        return res.status(500).json({ error: 'Failed to fetch user info' });
    }
    health_data = userInfo.map(info => info.info).join('\n');

    console.log(health_data);
    console.log('Health data retrieved for user:', uid);
    // let health_info = await UserInfo.find({ uid: uid, type: 'watch' });
    // const health_data = health_info.map(info => info.info);

    const system_initial = 'You are a health influencer, you will receive health data ' +
    'from user and you will evaluate their health condition and recent activities. ' +
    'Your job is to first reflect on the user\'s current health condition, and then ' +
    'provide either an advice, or recognize something they are doing well. Make sure your response is ' +
    'at most 2 sentences long as is just brief enough to keep them inform on their habits. Act politely with sympathy.\n';

    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                { role: 'system', content: system_initial },
                { role: 'user', content: health_data }
            ]
        });
        res.json({ response: completion.choices[0].message.content });
    } catch (error) {
        console.error('OpenAI API error:', error);
        res.status(500).json({ error: 'Failed to generate response' });
    }

});


app.get('/user-info-watch', async (req, res) => {
    const { uid } = req.query;
    if (!uid) {
        return res.status(400).json({ error: 'User ID is required' });
    }
    let type = 'watch';
    let userInfo = await UserInfo.findOne({ uid: uid, type: type });
    if (!userInfo) {
        return res.status(404).json({ error: 'User info not found' });
    }
    res.json({ userInfo: userInfo.info });
});

// // Get a user's apple watch info as a json object (TODO: Could go into user-server)
// app.post('/user-info-watch', async (req, res) => {
//     const { uid, data } = req.body;
//     if (!uid || !data) {
//         return res.status(400).json({ error: 'User ID and type are required' });
//     }

//     let type = 'watch';
//     let userInfo = await UserInfo.find({ uid: uid, type: type });
//     if (!userInfo) {
//         UserInfo = new UserInfo({
//             uid: uid,
//             type: type,
//             info: data
//         });
//     } else {
//         userInfo = await UserInfo.findOneAndUpdate({ uid: uid, type: type }, { info: data });
//     }
//     await userInfo.save();
//     res.json({ message: 'User info saved successfully' });
// });

// Get a user's document info as pdf file
app.post('/user-info-document', upload.single('document'), async (req, res) => {
    const uid = req.body.uid;
    const files = req.file;
    console.log('Received file:', files);
    if (!uid || !files) {
        return res.status(400).json({ error: 'User ID and type are required' });
    }


    let type = 'document';
    const uploadedFile = await openai.files.create({
        file: fs.createReadStream(files.path),
        purpose: 'user_data',
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
    console.log('Received data:', data.output_text);
    let userInfo = new UserInfo({
        uid: uid,
        type: type,
        info: data.output_text
    });
    await userInfo.save();
    res.json({ message: 'User info saved successfully' });
});

app.post('/user-info-manual', async (req, res) => {
    const { uid, category, date, physician, value } = req.body;
    if (!uid) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    let type = 'manual';
    let userInfo = new UserInfo({
        uid: uid,
        type: type,
        info: {
            category: category,
            date: date,
            physician: physician,
            value: value
        }
    });
    await userInfo.save();
    res.json({ message: 'User info saved successfully' });
});

app.get('/chat-dialog', async (req, res) => {
    console.log('Received request:', req.query);
    const { uid } = req.query;
    if (!uid) {
        return res.status(400).json({ error: 'User ID is required' });
    }
    let chatDialog = await ChatDialog.find({ uid: uid });
    if (!chatDialog) {
        return res.status(404).json({ error: 'Chat dialog not found' });
    }
    res.json({ chatDialog: chatDialog });
});

app.post('/new-chat', async (req, res) => {
    const { uid } = req.body;
    if (!uid) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    let userInfo;
    try {
        userInfo = await UserInfo.find({ uid: uid });
        console.log('userInfo:', userInfo);
        if (!userInfo) {
            return res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('MongoDB error:', error);
        return res.status(500).json({ error: 'Failed to fetch user info' });
    }
    health_data = userInfo.map(info => info.info).join('\n');

    console.log(health_data);
    console.log('Health data retrieved for user:', uid);
    // let health_info = await UserInfo.find({ uid: uid, type: 'watch' });
    // const health_data = health_info.map(info => info.info);

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
        
        let response = '';
        for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content;
            response += content || '';
            if (content) {
                res.write(content);
            }
        }

        res.end();
        console.log('Response:', response);
        let chatHistory = [];
        chatHistory.push({ role: 'assistant', content: system_initial });
        chatHistory.push({ role: 'user', content: health_data });
        chatHistory.push({ role: 'assistant', content: response });
        // get a title for the chat from openai
        const title = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                { role: 'user', content: `Please give a title for this chat: ${response}` }
            ]
        });
        // Save chat dialog to MongoDB
        const chatDialogEntry = new ChatDialog({
            uid: uid,
            chatTitle: title.choices[0].message.content
        });
        await chatDialogEntry.save();
        let chatId = chatDialogEntry._id;
        // Save chat history to MongoDB
        const chatHistoryEntry = new ChatHistory({
            uid: uid,
            chatId: chatId,
            history: chatHistory
        });
        console.log('Chat history:', chatHistory);

        await chatHistoryEntry.save();
    } catch (error) {
        console.error('OpenAI API error:', error);
        res.status(500).json({ error: 'Failed to generate response' });
    }

});

app.post('/chat', async (req, res) => {
    console.log('Received request:', req.body);
    const { uid, chatId, prompt } = req.body;
    if (!uid || !chatId || !prompt) {
        return res.status(400).json({ error: 'User ID, chat ID, and prompt are required' });
    }
    // Add new prompt to chat history
    let chatHistory = await ChatHistory.findOne({ uid: uid, chatId: chatId });
    if (!chatHistory) {
        return res.status(404).json({ error: 'Chat history not found' });
    }
    console.log('Chat history:', chatHistory);
    // Get type of chat history
    chatHistory.history.push({ role: 'user', content: prompt });

    try {
        console.log('Here');
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: chatHistory.history,
        });
        // Add new response to chat history
        chatHistory.history.push({ role: 'assistant', content: completion.choices[0].message.content });
        // Update chat history to MongoDB
        console.log('Chat history:', chatHistory);
        await chatHistory.save();
        console.log('Chat history updated successfully');
        res.json({ response: completion.choices[0].message.content });
    } catch (error) {
        console.error('OpenAI API error:', error);
        res.status(500).json({ error: 'Failed to generate response' });
    }
});

app.get('/chat', async (req, res) => {
    const { uid, chatId } = req.query;
    if (!uid || !chatId) {
        return res.status(400).json({ error: 'User ID and Chat ID is required' });
    }
    console.log('Received uid and chatId:', uid, chatId);

    // Fetch chat history from MongoDB and store in chatHistory global variable
    try {
        let chatHistory = await ChatHistory.findOne({ uid: uid, chatId: chatId });
        if (!chatHistory) {
            return res.status(404).json({ error: 'Chat history not found' });
        }
    } catch (error) {
        console.error('MongoDB error:', error);
        return res.status(500).json({ error: 'Failed to fetch chat history' });
    }
    // console.log('Chat history:', chatHistory);
    res.json({ chatHistory: chatHistory });
});

app.post('rename-dialog', async (req, res) => {
    const { uid, chatId, chatTitle } = req.body;
    if (!uid || !chatId || !chatTitle) {
        return res.status(400).json({ error: 'User ID, chat ID, and chat title are required' });
    }
    try {
        await ChatDialog.updateOne({ uid: uid, chatId: chatId }, { chatTitle: chatTitle });
        res.json({ message: 'Chat title updated successfully' });
    } catch (error) {
        console.error('MongoDB error:', error);
        res.status(500).json({ error: 'Failed to update chat title' });
    }
});

app.post('/delete-chat', async (req, res) => {
    const { uid, chatId } = req.body;
    if (!uid || !chatId) {
        return res.status(400).json({ error: 'User ID and chat ID are required' });
    }
    try {
        await ChatHistory.deleteOne({ uid: uid, chatId: chatId });
        await ChatDialog.deleteOne({ uid: uid, chatId: chatId });
        res.json({ message: 'Chat deleted successfully' });
    } catch (error) {
        console.error('MongoDB error:', error);
        res.status(500).json({ error: 'Failed to delete chat' });
    }
});

app.post('/delete-all-chat', async (req, res) => {
    const { uid } = req.body;
    if (!uid) {
        return res.status(400).json({ error: 'User ID is required' });
    }
    try {
        await ChatHistory.deleteMany({ uid: uid });
        await ChatDialog.deleteMany({ uid: uid });
        res.json({ message: 'Chat deleted successfully' });
    } catch (error) {
        console.error('MongoDB error:', error);
        res.status(500).json({ error: 'Failed to delete chat' });
    }
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on port ${port}`);
});
