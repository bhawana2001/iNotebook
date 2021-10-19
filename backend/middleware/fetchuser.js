const jwt = require('jsonwebtoken')
//create a JWT secret code 
const JWT_SECRET = 'Bhawanagaur';
const fetchuser = (req, res, next) => {
    //get the user from the jwt token and add id to request object
    const token = req.header('auth-token');
    //if token is not correct
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
    try {
        //verify token with secret code
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }

}

module.exports = fetchuser;