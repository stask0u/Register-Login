const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const userSchema = require('../schemas/UserSchema');
const multer = require('multer');
const path = require('path');

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
        const decodedToken = jwt.decode(token);
        let filteredToken;
        if(decodedToken.path){
             filteredToken={
                username:decodedToken.username,
                email:decodedToken.email,
                iat:decodedToken.iat,
                profilePicture: decodedToken.path,
            }
        }else{
             filteredToken={
                username:decodedToken.username,
                email:decodedToken.email,
                iat:decodedToken.iat,
                profilePicture: "uploads/profileDefault.png",
            }
        }
        
        res.status(200).json(filteredToken);
    } catch (error) {
        console.error('Error decoding token:', error);
        res.status(500).send('Error decoding token');
    }
});

router.post('/register', upload.single('profilePicture'), async (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const profilePicture = req.file ? req.file.path : null;

    try {
        const searchUser = await userSchema.findOne({ email: email });
        if (!searchUser) {
            const newUser = await userSchema.create({
                username: username,
                email: email,
                password: password,
                profilePicture: profilePicture
            });
            res.status(201).send('User registered successfully');
        } else {
            res.status(400).send('User already exists');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

router.post('/login', async (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    try {
        const searchUser = await userSchema.findOne({email:email})
       
        if(searchUser&&searchUser.password==password){
             const user = {
                username:searchUser.username,
                email:email,
                password:password,
                path:searchUser.profilePicture
            }
            
            const accessToken = jwt.sign(user,accessTokenSecret)
            res.status(201).json({ accessToken: accessToken });
        }else
        res.status(400).send('User doesnt exists');
    }catch(error){
        console.error(error)
    }
})

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