const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const user = new mongoose.Schema({
    username:{type:String, required:true,trim: true},
    mobile:{type:Number, required:true,trim: true,},
    email:{type:String, required:true,trim: true},
    address:{type:String, required:true, trim: true},
    tokens:[{token:{type:String,}}],
});

user.methods.generateAuthToken = async function (){
    try{
        let token = jwt.sign({ _id: this._id}, process.env.SECRET_KEY); 
        this.tokens = this.tokens.concat({ token: token});
        await this.save();
        return token;

    }catch(err){ console.log(err) }
}

const User = mongoose.model('USER', user);

module.exports = User;