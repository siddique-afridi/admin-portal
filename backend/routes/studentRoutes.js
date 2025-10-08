const express = require ('express');
const auth = require ('../middleware/auth');
// const validateCreateStudent = require('../middleware/studentValidator/createValidator')
const { getStudents, createStudent, getStudentById, updateStudent, deleteStudent } = require('../controllers/student');
// const updateValidator = require('../middleware/studentValidator/updateValidator');
const upload = require('../config/multerConfig');
const uploadProfile = require('../controllers/uploadProfile');

const router = express.Router();

router.get('/', 
  auth, 
  getStudents);

// console.log("auth:", auth);
router.post('/',
     auth,
    //  validateCreateStudent,
      createStudent
    );

router.delete('/:id', 
  auth,
   deleteStudent)

console.log("getStudents:", getStudents);

router.put('/:id', 
  auth,
  // updateValidator,
   updateStudent);
// console.log("createStudent:", createStudent);

router.post('/upload-profile',
   upload.single("profileImage"),
    uploadProfile)


module.exports = router;