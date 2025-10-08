
const Student = require ('../models/Students');
const getNextRollNo = require("../utils/studentRoll")

// Get All Students (with filters)
exports.getStudents = async (req, res) => {
  try {

    const { search, class: classFilter, section } = req.query;

  
    const filter = {};

    if (search) {
      if (/^\d+$/.test(search)) {
        filter.rollNo = Number(search);
      } else {
        filter.name = new RegExp(search, "i");
      }
    }

    if (classFilter) {
      filter.class = classFilter;
    }

    if (section) {
      filter.section = section;
    }

    const students = await Student.find(filter).sort({ rollNo: 1 }).populate("teacher");

    return res.json(students);

  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};




// Create student
exports.createStudent = async(req, res)=> {
  console.log("Incoming student data:", req.body);
    try{
      const rollNo = await getNextRollNo();
        const student = new Student({
            ...req.body,
            rollNo
        });
    
        await student.save();
        res.status(201).json(student);

    }catch(err){
        return res.status(400).json({message: "Error creating student", error: err.message});
    }
}

exports.deleteStudent = async(req,res)=>{
  console.log("delete api");
  try{
    const student = await Student.findByIdAndDelete(req.params.id);
    if(!student){
      return res.status(404).json({message:"Student not found"})
    }
    res.json({message:"Student deleted succesfully"})

  }catch(error){
    res.status(500).json({message:"server error"})

  }
}

exports.updateStudent = async (req, res) => {
    try {
      const student = await Student.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!student) return res.status(404).json({ message: "Student not found" });
      return res.json(student);
    } catch (err) {
      return res.status(400).json({ message: "Error updating student", error: err.message });
    }
  };

// Get single student
// exports.getStudentById = async(req, res)=> {
//     try{
//         const student = await Student.findById(req.params.id);
//     }catch{

//     }
// }