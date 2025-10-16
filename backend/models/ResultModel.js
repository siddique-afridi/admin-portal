
const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    student: {type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true},
    teacher: {type: mongoose.Schema.Types.ObjectId, ref: "Teacher", required: true},
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    marksObtained: { type: Number, required: true },
    totalMarks: { type: Number, required: true },
    grade: { type: String },
    remarks: { type: String },
    term: { type: String, enum: ["Midterm", "Final", "Quiz", "Assignment"] },
    date: { type: Date, default: Date.now },
})

// Automatically calculate grade before saving
resultSchema.pre("save", function (next) {
    const percentage = (this.marksObtained / this.totalMarks) * 100;
  
    if (percentage >= 85) this.grade = "A";
    else if (percentage >= 70) this.grade = "B";
    else if (percentage >= 55) this.grade = "C";
    else if (percentage >= 40) this.grade = "D";
    else this.grade = "F";
  
    next();
  });

module.exports = mongoose.model("Result", resultSchema)

// 1 model
// 2 route
// 3 controller
// 4 server.js path set
// 5 frontend