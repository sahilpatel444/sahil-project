const mongoose = require("mongoose")

const userSchema =new mongoose.Schema({
    googleId: { type: String, required: true },
    name:{type: String,require:true},
    email:{type:String,require:true,unique:true},
    picture: { type: String },
    password: { type: String, required: true },
})

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });

  // Method to compare passwords
userSchema.methods.comparePassword = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
  };
module.exports = mongoose.model("User",userSchema)