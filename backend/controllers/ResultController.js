
const XLSX = require("xlsx");
const Result = require('../models/ResultModel');
const Student = require('../models/Students');
const Teacher = require('../models/teacherModel/teachers');
const Course = require('../models/Course')



exports.createResult = async(req,res)=>{
    try{
        const result = await Result.create(req.body);
        
        res.status(201).json({message:"Result created",result})
    }catch(err){
        res.status(400).json({message: err.message})
    }
}


exports.getResults = async(req,res)=>{
    try{
       const results = await Result.find()
       .populate("student", "name")
       .populate("teacher", "name")
       .populate("course", "name")

       res.json(results);

    }catch(err){
        res.status(500).json({message: err.message});

    }
}

exports.deleteResult = async(req,res)=>{
    try{
        await Result.findByIdAndDelete(req.params.id);

        res.json({message: "Result deleted"})

    }catch(err){
        res.status(500).json({message: err.message})

    }
}

//  for loading data into result component

exports.loadData = async(req,res)=>{
    try{
        //   next we will fetch teachers and also students that comes under that teacher, means that are referenced in teacher document.....10 Oct

        const teachers = await Teacher.find().select("_id name");

        const students = await Students.find().select("_id name");
        // courses query will be added soon
        
        res.status(200).json({message:"teachers and students loaded", teachers, students})
    }catch(err){
        res.status(500).json({message: err.message})
    }
}


//  excel upload

exports.uploadResultsFromExcel = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    // ✅ Read Excel file
    const workbook = XLSX.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    // ✅ Example of expected columns in Excel
    // Student | Teacher | Course | MarksObtained | TotalMarks | Term | Remarks

    const resultsToInsert = [];

    for (const row of sheetData) {
        // Match by name
        const student = await Student.findOne({ name: row.studentName.trim() });
        const teacher = await Teacher.findOne({ name: row.teacherName.trim() });
        const course = await Course.findOne({ name: row.courseName.trim() });
  
        if (!student || !teacher || !course) {
          console.log("Skipping row - invalid mapping:", row);
          continue;
        }
    }
    for (let row of sheetData) {
      const percentage = (row.MarksObtained / row.TotalMarks) * 100;
      let grade;
      if (percentage >= 90) grade = "A+";
      else if (percentage >= 80) grade = "A";
      else if (percentage >= 70) grade = "B";
      else if (percentage >= 60) grade = "C";
      else if (percentage >= 50) grade = "D";
      else grade = "F";

      resultsToInsert.push({
        student: row.Student,   // must be student _id or name you match
        teacher: row.Teacher,   // same logic
        course: row.Course,
        marksObtained: row.MarksObtained,
        totalMarks: row.TotalMarks,
        term: row.Term,
        grade,
        remarks: row.Remarks,
      });
    }

    // ✅ Insert all records into DB
    const savedResults = await Result.insertMany(resultsToInsert);
    res.status(201).json({ message: "Results uploaded successfully", savedResults });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to upload results", error: error.message });
  }
}
