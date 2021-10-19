const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator')

//Create a User using: POST "/api/auth/createUser" . No login required
router.post('/createuser', [
    body('email', 'Enter a valid email').isEmail(),
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('password', 'Password must be at least 8 characters').isLength({ min: 8 })
], async (req, res) => {
    //if there are error return that request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: error.array() })
    }
    //check whether user with same email exists already
    try {
        //check if user exist 
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "Sorry a user with this email already exists" })
        }
        //create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })
        res.json(user)

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some error occured");
    }
})

module.exports = router
