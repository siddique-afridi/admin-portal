const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// step 2 create user schema from mongoose.Schema
const userSchema = new mongoose.Schema(
{
    username: {type:String, required:true},
    email: {type:String, required:true, unique: true},
    password: {type:String, required:false}, // store hashed password
    googleId: String, // for Google login
    facebookId: String, // for Facebook login
    // enum in mongoose means value must be one of the total values
    role: { type: String, enum: ["admin", "teacher", "student"], default: "admin" },
    // otp
    otp: { type: String, default: null },
    otpExpiry: { type: Date, default: null }   ,
    
    lastOtpSentAt: { type: Date, default: null }

}, { timestamps: true });


//  step 3 hash password if changed or new... use pre-save hook
userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();

    try{
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
        next();
    }
    catch(err){

        next(err);
    }
});

// method for comparing password from login

userSchema.methods.comparePassword = function(enteredPassword){
    return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);


//  passport js setup steps
// 1 add google and facebook fields in User model
// 2 config/ passport configuration