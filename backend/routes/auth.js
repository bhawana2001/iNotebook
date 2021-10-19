const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

//create a JWT secret code 
const JWT_SECRET = 'Bhawanagaur';

//Create a User using: POST "/api/auth/createUser" . No login required
router.post('/createuser', [
    body('email', 'Enter a valid email').isEmail(),
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('password', 'Password must be at least 8 characters').isLength({ min: 8 })
], async (req, res) => {
    //if there are error return bad request and the error
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
        //create secure password function 
        const salt = await bcrypt.genSalt(10);  //create a salt
        const secPass = await bcrypt.hash(req.body.password, salt);

        //create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });

        //create a data object for jwt token
        const data = {
            user: {
                id: user.id
            }
        }
        //create auth token by signing data with seceret code
        const authtoken = jwt.sign(data, JWT_SECRET)
        //response send as a authtoken
        res.json({ authtoken })

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error");
    }
})

//Authenticate a user using : POST "/api/auth/login" . no login required
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {
    //if there are error return bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: error.array() })
    }

    const { email, password } = req.body;
    try {
        //to pull data of user using email
        let user = await User.findOne({ email });
        //if user does not exist with that email
        if (!user) {
            return res.status(400).json({ error: "Please try to login with correct credentials" })
        }
        //match password 
        const passwordCompare = await bcrypt.compare(password, user.password);
        //if password is wrong then send bad request
        if (!passwordCompare) {
            return res.status(400).json({ error: "Please try to login with correct credentials" })
        }
        //if password matches send user
        const data = {
            user: {
                id: user.id
            }
        }
        //create auth token by signing data with seceret code
        const authtoken = jwt.sign(data, JWT_SECRET)
        //response send as a authtoken
        res.json({ authtoken })

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error ");
    }

})
module.exports = router
