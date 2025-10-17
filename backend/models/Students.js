
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNo: { type: Number, required: true },
  class: { type: String, required: true },
  age: { type: Number },
  gender: { type: String, enum: ["male", "female", "other"] },
  contact: { type: String },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],

  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      default: [0, 0],
    },
    address: { type: String, default: "Unknown" },
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher"
  },
  profileImage: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
studentSchema.index({ location: "2dsphere" });
module.exports = mongoose.model('Student', studentSchema);


// 1 ceate student model
// 2 create student controller and define actual logic there like create or update or get all students
// 3 create studentRoutes and define endpoints there
// 4 in server.js define a complete path like >> app.use('/api/students', function  OR  require('./routes/studentRoutes'));