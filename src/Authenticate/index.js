const jwt = require('jsonwebtoken');
const User = require('../Models/index');

require('../Routers/index');

const authenticate = async (req,res,next) => {
    try {
        
        const token = req.cookies.jwtoken;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        if(!token){
            return res.status(401).send("Unauthorized: No Token Provided");
        }

        const user = await User.findOne({ _id: verifyToken._id, "tokens.token": token});

        req.user = user;

        next();

    } catch (error) {
        res.status(402).send("Unauthorized: No Token Provided");
        console.log("No Token");
    }
}

module.exports = authenticate;