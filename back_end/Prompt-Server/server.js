const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/prompt', (req, res) => {
    res.send('Hello from server');
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on port ${port}`);
});
