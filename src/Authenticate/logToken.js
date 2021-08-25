const jwt = require('jsonwebtoken');

const authenticateLog = async (req,res,next) => {
    try {
        
        const token = req.cookies.jwt;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

        next();
    } 
    catch (error) {
        res.status(402).send("Unauthorized: No Token Provided");
        console.log(error);
    }
}

module.exports = authenticateLog;