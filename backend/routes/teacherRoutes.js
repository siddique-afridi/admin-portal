
const express = require('express');
const {createTeacher, getTeachers, deleteTeacher} = require('../controllers/teacherController/teacherController');
const auth = require('../middleware/auth');

const router  = express.Router();


router.post('/', 
    auth,
     createTeacher);
router.get('/',
     auth,
     getTeachers )
router.delete('/:id',
    auth,
      deleteTeacher)





module.exports = router;