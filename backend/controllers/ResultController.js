const XLSX = require("xlsx");
const Result = require("../models/ResultModel");
const Student = require("../models/Students");
const Teacher = require("../models/teacherModel/teachers");
const Course = require("../models/Course");

exports.createResult = async (req, res) => {
  try {
    const result = await Result.create(req.body);
    
    res.status(201).json({ message: "Result created", result });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getResults = async (req, res) => {
  try {
    const search = req.query.search || "";

    console.time("getResultsQuery");
    const results = await Result.aggregate([

      
      {
        $lookup: {                                 //lookup always creates an array>>>>> to get singls document in the search we just $unwind it
          from: "students",             
          localField: "student",
          foreignField: "_id",
          as: "student",
        },
      },
      
      {
       $match: {
         $or: [
           { "student.name": { $regex: search, $options: "i" } },
           // { "teacher.name": { $regex: search, $options: "i" } },
           // { "course.name": { $regex: search, $options: "i" } },
           // { remarks: { $regex: search, $options: "i" } },
         ],    
       },
     },
      
      { $unwind: "$student" },               // it flattens the student array created by lookup, returning a single document for each _id
      {
        $lookup: {
          from: "teachers",
          localField: "teacher",
          foreignField: "_id",
          as: "teacher",
        },
      },
      { $unwind: "$teacher" },
      {
        $lookup: {
          from: "courses",
          localField: "course",
          foreignField: "_id",
          as: "course",
        },
      },
      { $unwind: "$course" },
      
     
      
    ]);
    console.timeEnd("getResultsQuery");
    // console.log("execution time",results)

    res.json(results);
  } catch (err) {
    console.error(" Error fetching results:", err);
    res.status(500).json({ message: err.message });
  }
};


exports.deleteResult = async (req, res) => {
  try {
    await Result.findByIdAndDelete(req.params.id);

    res.json({ message: "Result deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//  for loading data into result component

exports.loadData = async (req, res) => {
  try {
    //   next we will fetch teachers and also students that comes under that teacher, means that are referenced in teacher document.....10 Oct

    const teachers = await Teacher.find().select("_id name");

    const students = await Student.find().select("_id name");
    // courses query will be added soon

    res
      .status(200)
      .json({ message: "teachers and students loaded", teachers, students });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//  excel upload

exports.uploadResultsFromExcel = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    // Read Excel
    const workbook = XLSX.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
    console.log("excel data format", sheetData[0]);

    const resultsToInsert = [];

    for (const row of sheetData) {
      //  Extract safely (force strings)
      const student = String(row.student || "").trim();
      const teacher = String(row.teacher || "").trim();
      const course = String(row.course || "").trim();
      const marksObtained = Number(row.marksObtained);
      const totalMarks = Number(row.totalMarks);
      const remarks = row.remarks ? String(row.remarks).trim() : "";
      const term = row.term ? String(row.term).trim() : "";

      if (!student || !teacher || !course) {
        console.log(" Skipping row - missing student/teacher/course:", row);
        continue;
      }

      //  Find records (ObjectId or name)
      const studentRecord = /^[0-9a-fA-F]{24}$/.test(student)
        ? await Student.findById(student)
        : await Student.findOne({ name: student });

      const teacherRecord = /^[0-9a-fA-F]{24}$/.test(teacher)
        ? await Teacher.findById(teacher)
        : await Teacher.findOne({ name: teacher });

      const courseRecord = /^[0-9a-fA-F]{24}$/.test(course)
        ? await Course.findById(course)
        : await Course.findOne({ name: course });

      console.log("Mapping check:", {
        studentRecord,
        teacherRecord,
        courseRecord,
      });

      if (!studentRecord || !teacherRecord || !courseRecord) {
        console.log(" Skipping row - invalid mapping:", row);
        continue;
      }

      //  Calculate grade
      const percentage = (marksObtained / totalMarks) * 100;
      let grade;
      if (percentage >= 90) grade = "A+";
      else if (percentage >= 80) grade = "A";
      else if (percentage >= 70) grade = "B";
      else if (percentage >= 60) grade = "C";
      else if (percentage >= 50) grade = "D";
      else grade = "F";

      //  Push data for bulk insert
      resultsToInsert.push({
        student: studentRecord._id,
        teacher: teacherRecord._id,
        course: courseRecord._id,
        marksObtained,
        totalMarks,
        term,
        grade,
        remarks,
      });
    }

    if (resultsToInsert.length === 0) {
      return res
        .status(400)
        .json({ message: "No valid rows found (check names in Excel)" });
    }

    const savedResults = await Result.insertMany(resultsToInsert);
    res
      .status(201)
      .json({ message: "Results uploaded successfully", savedResults });
  } catch (error) {
    console.error(" Error uploading results:", error);
    res
      .status(500)
      .json({ message: "Failed to upload results", error: error.message });
  }
};
