const { OpenAI } = require('openai');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const system_initial = 'You are a wellbeing coach, you will receive health data ' +
    'from user and you will evaluate their health condition and recent activities. ' +
    'Your job is to first reflect on the user\'s current health condition, and then ' +
    'answer their questions. Act concisely and politely with sympathy.\n' +
    'The user wants to be called by their nickname. If they don\'t have a nickname, ' +
    'call them by their real name.\n' +
    'First, greet the user and reflect on their recent health status!';

app.use(express.json());

app.post('/new-chat', async (req, res) => {
    const { health_data } = req.body;

    if (!health_data) {
        return res.status(400).json({ error: 'Data is required' });
    }

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

app.listen(port, '0.0.0.0', () => {
    console.log(`Prompt server listening on port ${port}`);
});
