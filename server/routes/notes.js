const express = require('express');
const router = express.Router();
const userSchema = require('../schemas/UserSchema');


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

router.post('/', async (req,res)=>{
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

module.exports = router;