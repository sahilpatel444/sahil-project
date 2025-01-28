const mongoose = require("mongoose")

const userSchema =new mongoose.Schema({
    googleId: { type: String, required: true },
    name:{type: String,require:true},
    email:{type:String,require:true,unique:true},
    picture: { type: String },
   
})
const User = mongoose.model('User', userSchema);

module.exports = User