const Teacher = require ('../../models/teacherModel/teachers')


// Create teacher Logic

exports.createTeacher = async(req, res)=> {
    try{
        // first receive the params from body by the user
    const teacher = new Teacher(req.body);
    // 2 save teacher in some variable so we can send saved teacherdata in response
    //  use await for DB operations 
    const savedTeacher = await teacher.save();

    // res.json(savedTeacher); //savedTeacher is sent below , sending twice gives error
    // 3 send response to frontend on success and also send saved teacher details in res body
    res.status(201).json({message: "Teacher added successfully", savedTeacher})

    }catch(error){
    res.status(401).json({message: "Error creating teacher", error})
}
}


//  get ALL teachers

exports.getTeachers = async(req, res)=> {
    try{
        const teachers = await Teacher.find();

        res.json(teachers);

    }catch(error){
        res.json({message: "Error loading teachers", error})
    }

}


exports.deleteTeacher = async(req, res)=> {
    try{
         const teacher = await Teacher.findByIdAndDelete(req.params.id);

         if(!teacher) return res.status(404).json({message: "Teacher not found"})
            res.json({message: "Teacher deleted successfully"})

    }catch(error){
        res.status(500).json({message: "server error", error})
    }
}
