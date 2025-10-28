
const Student = require('../models/Students');
const Course = require('../models/Course');
const Teacher = require('../models/teacherModel/teachers')


exports.getDashboardData = async(req,res)=>{
    try{
        const teachers = await Teacher.find();
        const students = await Student.find();
        const courses = await Course.find();

        // now we will add class stats logic here to get total teachers and students in the same class

        const studentsAgg = await Student.aggregate([
            {
                $group: {
                    _id: "$class", totalStudents: {$sum:1}
                }

            },
            {
                $addFields: {classNum : {$toInt: "$_id"}}

            },
            {
                $sort: {classNum : 1}
            }
        ])
//  console.log("students", studentsAgg)
        // getting class of teachers 
        const teachersAgg = await Teacher.aggregate([
            {
                $group: {
                    _id: "$class",  teacherNames: { $push: "$name" }   //here push puts all the teachers name that belongs to  same class
                }
            },
            {
                $addFields: { classNum: { $toInt: "$_id" } }
              },
              { $sort: { classNum: 1 } }
        ])

        // now we have both students and teachers grouped by class now we merge them into a single array to return class stats

        const classStats = studentsAgg.map((student)=>{
            const teacher = teachersAgg.find((teacher)=>teacher._id === student._id);
            return {
                class: `Class ${student._id}`,
                // class: student._id,
                totalStudents: student.totalStudents,
                teacherAssigned: teacher ? teacher.teacherNames : [],
                teacherCount: teacher ? teacher.teacherNames.length : 0
            }
        })
        res.status(200).json({
            teachers,
            students,
            courses,
            stats: classStats,
          });
        } catch (error) {
          console.error("Error fetching dashboard data:", error);
          res.status(500).json({
            message: "Error fetching dashboard data",
            error,
          });
        }
      };
  