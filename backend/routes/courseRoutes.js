const express = require('express');
const router = express.Router();
const {createCourse, getAllCourses, getCourseById, deleteCourseById} = require('../controllers/coursesController')


router.post('/', createCourse);

router.get('/', getAllCourses);

router.get('/:id', getCourseById);

router.delete('/:id', deleteCourseById);



module.exports = router;