const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const port = process.env.PORT || 3000;
app.use(bodyParser.json());

console.log(process.env.MONGO_URL);
try {
    mongoose.connect(process.env.MONGO_URL);
    console.log('MongoDB connected successfully');
} catch (err) {
    console.log('MongoDB connection failed:', err.message);
    process.exit(1);
}
const userSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    nickname: {
        type: String,
        required: true,
    },
});
const settingsSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true,
        unique: true,
    },
    theme: {
        type: String,
        enum: ['light', 'dark'],
        default: 'dark',
    },
});
const User = mongoose.model('User', userSchema);
const Settings = mongoose.model('Settings', settingsSchema);

user = new User({
    uid: 'reet0512',
    email: 'reetkothari0512@gmail.com',
    nickname: 'Reet',
});
settings = new Settings({
    uid: 'reet0512',
    theme: 'dark',
});
user.save();
settings.save();
user = new User({
    uid: 'gracecluvohio',
    email: 'gracecluvohio@gmail.com',
    nickname: 'Grace',
});
settings = new Settings({
    uid: 'gracecluvohio',
    theme: 'dark',
});
user.save();
settings.save();

app.post('/login', async(req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'No username or password provided' });
    }
    console.log("Received username token:", username);

    try {
        // // Verify and decode the token
        // const decoded = jwt.decode(identityToken, { complete: true });
        
        // Normally you'd verify it properly with Apple's public keys (security step)
        // const { sub, email } = decoded.payload; // `sub` is the unique Apple ID for the user

        // // Sanity Check
        // console.log("User's Apple ID:", sub);
        // console.log("User's email:", email);
        
        let user = await User.findOne({ uid: username });
        // let theme = 'dark';
        // if (!user) {
        //     // If user doesn't exist, create a new one
        //     user = new User({
        //         uid: sub,
        //         firstName: decoded.payload.firstName || '',
        //         lastName: decoded.payload.lastName || ''
        //     });
        //     await user.save();
        //     settings = new Settings({
        //         uid: sub,
        //         theme: 'dark',
        //     });
        //     await settings.save();
        //     console.log("New user created:", user);
        // } else {
        //     console.log("Existing user found:", user);
        //     theme = await Settings.findOne({ uid: sub });
        //     theme = theme.theme;    
        // }
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // TODO: Handle Getting User Health Data and return
        // Return something to the app
        return res.json({ uid: username, theme: theme, message: 'Login successful' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to verify User ID' });
    }
});

app.post('/change-theme', async(req, res) => {
    const { uid, theme } = req.body;
    if (!uid || !theme) {
        return res.status(400).json({ error: 'User ID and theme are required' });
    }
    let settings = await Settings.findOne({ uid: uid });
    if (!settings) {
        return res.status(404).json({ error: 'User ID not found' });
    } else {
        settings.theme = theme;
    }
    await settings.save();
    res.json({ message: 'Theme changed successfully' });
});

app.post('/delete-acc', async(req, res) => {
    const { uid } = req.body;
    if (!uid) {
        return res.status(400).json({ error: 'User ID is required' });
    }
    let user = await User.findOne({ uid: uid });
    if (!user) {
        return res.status(404).json({ error: 'User ID not found' });
    } else {
        await User.deleteOne({ uid: uid });
        await Settings.deleteOne({ uid: uid });
        await mongoose.model('ChatDialog').deleteMany({ uid: uid });
        await mongoose.model('ChatHistory').deleteMany({ uid: uid});
        await mongoose.model('UserInfo').deleteMany({ uid: uid});
    }
    res.json({ message: 'Account deleted successfully' });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on port ${port}`);
});
