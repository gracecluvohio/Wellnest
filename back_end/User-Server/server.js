const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const fetch = require('node-fetch');

const port = process.env.PORT || 3000;
app.use(bodyParser.json());


mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const userSchema = new mongoose.Schema({
    appleId: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    }
});

const User = mongoose.model('User', userSchema);


app.post('/login', async(req, res) => {
    const { identityToken } = req.body;
    if (!identityToken) {
        return res.status(400).json({ error: 'No identity token provided' });
    }

    try {
        // Verify and decode the token
        const decoded = jwt.decode(identityToken, { complete: true });
        
        // Normally you'd verify it properly with Apple's public keys (security step)
        const { sub, email } = decoded.payload; // `sub` is the unique Apple ID for the user

        // Sanity Check
        console.log("User's Apple ID:", sub);
        console.log("User's email:", email);
        
        let user = await User.findOne({ appleId: sub });
        if (!user) {
            // If user doesn't exist, create a new one
            user = new User({
                appleId: sub,
                firstName: decoded.payload.firstName || '',
                lastName: decoded.payload.lastName || ''
            });
            await user.save();
            console.log("New user created:", user);
        } else {
            console.log("Existing user found:", user);
        }

        // Return something to the app
        return res.json({ userId: sub, message: 'Login successful' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to verify Apple ID' });
    }
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on port ${port}`);
});
