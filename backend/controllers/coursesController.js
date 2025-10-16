const Course = require("../models/Course");
const Teacher = require('../models/teacherModel/teachers')


// create course
exports.createCourse = async(req,res)=>{
    try{
        const {name, code ,teacherId,creditHours, duration} = req.body;

        const teacher = await Teacher.findById(teacherId);
        if (!teacher) return res.status(404).json({ message: "Teacher not found" });
        
            const newCourse = new Course({name, code , teacher: teacherId,creditHours, duration})
            await newCourse.save();

            //   lets update teacher to add course to the teacher document 
            teacher.courses.push(newCourse._id);
            await teacher.save()

 
             res.status(201).json({message: "Course created successfully", newCourse})

            
    }catch(err){
        res.status(500).json({message: err.message})
    }
}

// get All courses
exports.getAllCourses = async(req,res)=>{
    try{
        const courses = await Course.find().populate("teacher", "name email")

        res.status(200).json(courses)
    }catch(err){
        res.status(500).json({message: err.message})
    }
}

// get by Id
exports.getCourseById = async(req,res)=>{
    try{
        const course = await Course.findById(req.params.id).populate("teacher", "name email");
         
        res.status(200).json(course)
    }catch(err){
        res.status(500).json({message: err.message})
    }
}

// delete by Id
exports.deleteCourseById = async(req,res)=>{
    try{

        const deletedCourse = await Course.findByIdAndDelete(req.params.id);
    
        if(!deletedCourse) return res.status(404).json({message: "Course not found"});
    
        res.status(200).json({message: "Course deleted successfully"})
    }catch(err){
        res.status(500).json({message:err.message })
    }
}