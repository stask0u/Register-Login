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
        const decodedToken = jwt.decode(token);
        let filteredToken;
        if(decodedToken.path){
             filteredToken={
                username:decodedToken.username,
                email:decodedToken.email,
                iat:decodedToken.iat,
                profilePicture: decodedToken.path,
                notes:decodedToken.userNotes
            }
        }else{
             filteredToken={
                username:decodedToken.username,
                email:decodedToken.email,
                iat:decodedToken.iat,
                profilePicture: "uploads/profileDefault.png",
                notes:decodedToken.userNotes
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
                password: await bcrypt.hash(password, 10),
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
       
        if(searchUser&& await bcrypt.compare(password,searchUser.password)){
             const user = {
                username:searchUser.username,
                email:email,
                password:password,
                path:searchUser.profilePicture,
                userNotes:searchUser.Notes
            }
            
            const accessToken = jwt.sign(user,accessTokenSecret)
            res.status(201).json({ accessToken: accessToken });
        }else
        res.status(400).send('User doesnt exists');
    }catch(error){
        console.error(error)
    }
})
router.post('/addNote', async (req, res) => {
    const note = req.body.note;
    const email = req.body.email;

    try {
        const user = await userSchema.findOne({ email: email });
        if (user) {
            user.Notes.push({message:note});
            await user.save();
            res.status(200).send("Note added successfully.");
        } else {
            res.status(404).send("User not found.");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while adding the note.");
    }
});

router.post('/notes', async (req,res)=>{
    const email = req.body.email;
    if(email){
        const user = await userSchema.findOne({email:email}).select('Notes')
        res.status(200).json(user.Notes || [])
    }else
    res.status(404).send("User not found")
})
router.post('/deleteNote', async (req,res)=>{
    const email = req.body.email;
    const noteId = req.body._id;
    const user = await userSchema.findOne({email:email})
    if(user){
        const noteIndex  = user.Notes.findIndex(note => note._id.toString() === noteId);
        if(noteIndex !== -1 ){
            user.Notes.splice(noteIndex, 1);
            await user.save();
            res.status(200).send('Note removed')
        }else{
            res.status(404).send("No note found")
        }
    }else{
        res.status(404).send("User not found");
    }
})

router.post('/editNote', async (req,res)=>{
    const email = req.body.email;
    const noteId = req.body._id;
    const message = req.body.newMsg;
    const user = await userSchema.findOne({email:email})
    if(user){
        const noteIndex  = user.Notes.findIndex(note => note._id.toString() === noteId);
        if(noteIndex !== -1 ){
            user.Notes[noteIndex].message = message;
            await user.save();
            res.status(200).send('Note Edited')
        }else{
            res.status(404).send("No note found")
        }
    }else{
        res.status(404).send("User not found");
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