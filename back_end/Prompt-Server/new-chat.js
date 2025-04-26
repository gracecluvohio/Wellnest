const { OpenAI } = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const system_initial = 'You are a wellbeing coach, you will receive health data ' +
    'from user and you will evaluate their health condition and recent activities. ' +
    'You job is to first reflect on the user\'s current health condition, and then ' +
    'answer their questions. Act concisely and politely with sympathy.\n' +
    'The user wants to called by their nickname. If they donnot have a nickname, ' +
    'call them by their real name.\n' +
    'First, greet the user and reflect on their recent health status!'

app.use(express.json());

app.post('/new-chat', async (req, res) => {
    const { health_data } = req.body;

    if (!health_data) {
        return res.status(400).json({ error: 'Data is required' });
    }

    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                { role: 'system', content: system_initial },
                { role: 'data', content: health_data}
            ]

        });

        res.json({ response: completion.choices[0].message.content });
    } catch (error) {
        console.error('OpenAI API error:', error);
        res.status(500).json({ error: 'Failed to generate response' });
    }
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Prompt server listening on port ${port}`);
});