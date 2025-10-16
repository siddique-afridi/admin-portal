
const mongoose = require ('mongoose');

const courseSchema = mongoose.Schema({
    name: { type:String, required: true},
    code: {type: String, unique: true},
    teacher: {type: mongoose.Schema.Types.ObjectId, ref: "Teacher", required:true},
    creditHours: {type: Number},
    duration:{type: Number},
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }]
})

module.exports = mongoose.model("Course", courseSchema);