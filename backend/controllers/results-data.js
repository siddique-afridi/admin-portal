
const Teacher = require("../models/teacherModel/teachers");
const Student = require("../models/Students");
const Course = require("../models/Course");


exports.getAllDataForResult = async(req,res)=>{
    try{
        const teachers = await Teacher.find();
        const students = await Student.find();
        const courses = await Course.find();

        res.status(200).json({teachers, students, courses})
    }catch(err){
        res.status(500).json({message: err.message})
    }
}