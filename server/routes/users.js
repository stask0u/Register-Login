const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const userSchema = require('../schemas/UserSchema');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt');

const accessTokenSecret = "asdasdas";

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.post('/decode', async (req, res) => {
    const { token } = req.body;
    if (!token) {
        return res.status(400).send('Token is required');
    }

    try {
        jwt.verify(token, accessTokenSecret, (err, decodedToken) => {
            if (err) {
                return res.status(403).send('Invalid or expired token');
            }

            const filteredToken = {
                username: decodedToken.username,
                email: decodedToken.email,
                profilePicture: decodedToken.profilePicture || "uploads/profileDefault.png",
                notes: decodedToken.userNotes
            };

            res.status(200).json(filteredToken);
        });
    } catch (error) {
        console.error('Error decoding token:', error);
        res.status(500).send('Error decoding token');
    }
});

router.post('/register', upload.single('profilePicture'), async (req, res) => {
    const { username, email, password } = req.body;
    const profilePicture = req.file ? req.file.path : 'uploads/profileDefault.png';  

    if (!username || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const searchUser = await userSchema.findOne({ email: email });
        if (searchUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await userSchema.create({
            username,
            email,
            password: hashedPassword,
            profilePicture
        });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const searchUser = await userSchema.findOne({ email: email });

        if (searchUser && await bcrypt.compare(password, searchUser.password)) {
            const user = {
                username: searchUser.username,
                email: email,
                profilePicture: searchUser.profilePicture, 
                userNotes: searchUser.Notes
            };

            const accessToken = jwt.sign(user, accessTokenSecret);
            res.status(200).json({ accessToken });
        } else {
            res.status(400).send('Invalid email or password');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});


router.post('/profilePicture', upload.single("profilePicture"), async (req, res) => {
    const email = req.body.email;
    const profilePicture = req.file ? req.file.path : null;

    try {
        const searchUser = await userSchema.findOne({ email: email });

        if (searchUser) {
            searchUser.profilePicture = profilePicture;
            await searchUser.save();

            const updatedUser = {
                username: searchUser.username,
                email: searchUser.email,
                path: searchUser.profilePicture,
                userNotes: searchUser.Notes,
            };
            const accessToken = jwt.sign(updatedUser, accessTokenSecret);

            res.status(200).json({
                message: 'Profile picture updated successfully',
                accessToken: accessToken,
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

function authToken(req,res,next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(!token){
        return res.sendStatus(401)
    }

    jwt.verify(token,accessTokenSecret,(err,user) =>{
        if(err) return res.sendStatus(403)
            req.user = user;
        next()
    })
}


module.exports = router;