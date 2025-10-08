

const mongoose = require ("mongoose");

const teacherSchema = new mongoose.Schema({
    name:{type: String, required: true},
    subject: {type: String, required: true},
    class: {type: String, required: true},
    contact: String, 
    gender: String,
    age: Number
});

module.exports = mongoose.model("Teacher", teacherSchema);