const Student = require("../models/Students");
const Teacher= require("../models/teacherModel/teachers")


exports.handleChat = async(req,res)=>{
    try{
        const{message} = req.body;
        const lowerMsg = message.toLowerCase();

       
    if (lowerMsg.includes("hello") || lowerMsg.includes("hi") || lowerMsg.includes("hy") || lowerMsg.includes("hey") || lowerMsg.includes("helo") ) {
      return res.json({ reply: "Hello! How can I help you today?" });
    }

    
    if (lowerMsg.includes("total students") || lowerMsg.includes("list all students") ) {
      const count = await Student.countDocuments();
      return res.json({ reply: `There are ${count} students enrolled.` });
    }


    if (lowerMsg.includes("teacher")) {
      const teachers = await Teacher.find().select("name subject -_id");
      const formatted = teachers.map(t => `${t.name} (${t.subject})`).join(", ");
      return res.json({ reply: `Our teachers: ${formatted}` });
    }

    
    if (lowerMsg.includes("result")) {
      return res.json({ reply: "Please check results in your dashboard." });
    }

   
    return res.json({ reply: "Sorry, I didn’t understand that. Try asking about teachers or students." });

  } catch (error) {
    console.error(error);
    res.status(500).json({ reply: "Server error." });
  }
};