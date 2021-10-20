const express = require('express')
const router = express.Router()
const fetchuser = require('../middleware/fetchuser')
const Note = require('../models/Note')
const { body, validationResult } = require('express-validator')


//ROUTE : 1 - Get all the notes using: GET "/api/auth/getUser" . login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//ROUTE : 2 - Add a new notes using: POST "/api/auth/addnote" . login required
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

module.exports = router