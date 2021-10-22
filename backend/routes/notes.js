const express = require('express')
const router = express.Router()
const fetchuser = require('../middleware/fetchuser')
const Note = require('../models/Note')
const { body, validationResult } = require('express-validator')


//ROUTE : 1 - Get all the notes using: GET "/api/notes/getUser" . login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//ROUTE : 2 - Add a new notes using: POST "/api/notes/addnote" . login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Enter a description of at least 5 character').isLength({ min: 5 })
], async (req, res) => {
    try {
        const { title, description, tag } = req.body
        //if there are errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            title, description, tag, user: req.user.id

        })
        const saveNote = await note.save()
        res.json(saveNote)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//ROUTE : 3 - update a existing notes using: PUT "/api/notes/updatenote" . login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {

    try {

        const { title, description, tag } = req.body
        //create a new note object
        const newNote = {};
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }
        //find the note to be updated and update it
        //if note not found
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        //if user is not correct for note user id
        if (note.user.toString() != req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json(note);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


//ROUTE : 4 - Delete a existing notes using: DELETE "/api/notes/deletenote" . login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    try {
        //find the note to be deleted and delete it
        //if note not found
        let deleteNote = await Note.findById(req.params.id);
        if (!deleteNote) { return res.status(404).send("Not Found") }

        //if user is not correct for note user id
        if (deleteNote.user.toString() != req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        deleteNote = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", deleteNote: deleteNote })


    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router