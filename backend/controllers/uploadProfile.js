const Student = require("../models/Students")


const uploadProfile = async(req,res,next)=> {
    try{
        const {id} = req.body;

        console.log("req.file:", req.file);

        // now update user with profile photo in DB
        const updated = await Student.findByIdAndUpdate(
            id, 
            {profileImage: req.file.filename},
            {new: true}
        );
        if (!updated) {
            return res.status(404).json({ message: "Student not found" });
          }

        // now send response to frontend if try executes
        res.json({
            message:"Profile image uploaded successfully",
            student: updated
        })

    }catch(error){
        // here we also send response to frontend but in case of failure
        res.status(500).json({message:"Error uploading image",  error})

    }
};

module.exports = uploadProfile;


// 1 add key in model
// 2 create controller that talks with DB
// 3 create multer config, that will extract and store files in storage and we can use it in our route file.
// 4 create route that will connect frontend and backend and put "upload from multer config" and controller in the route
// 5 make the file public in server.js file so frontend/browser can access the files/profile photo
// 6 manually create uploads folder in backend