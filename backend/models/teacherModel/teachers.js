

const mongoose = require ("mongoose");

const teacherSchema = new mongoose.Schema({
    name:{type: String, required: true},
    subject: {type: String},
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
    class: {type: String, required: true},
    contact: {type:String, unique: true}, 
    gender: String,
    age: Number
});

module.exports = mongoose.model("Teacher", teacherSchema);