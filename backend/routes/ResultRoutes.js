

const {createResult, getResults, deleteResult,uploadResultsFromExcel, loadData} = require('../controllers/ResultController');
const upload = require('../config/multerConfig');
const express = require('express');
const router = express.Router();



router.post('/', createResult);

router.get('/', getResults);
// router.get("/search", searchResults);

router.delete('/:id', deleteResult);

// router.get('/student/:id', getStudentResult);

// router.put('/:id', updateResult);
router.post("/upload-excel", upload.single("file"), uploadResultsFromExcel);

router.get('/load-data', loadData)

module.exports = router;
