const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const token = new mongoose.Schema({
    tokens:[{token:{type:String,}}],
});

token.methods.generateAuthToken = async function (){
    try{
        let token = jwt.sign({ _id: this._id}, process.env.SECRET_KEY); 
        this.tokens = this.tokens.concat({ token: token});
        await this.save();
        return token;

    }catch(err){ console.log(err) }
}

const Token = mongoose.model('TOKEN', token);

module.exports = Token;