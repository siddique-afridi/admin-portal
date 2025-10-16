
const express = require ("express");
const { getAllDataForResult } = require("../controllers/results-data");
const router = express.Router();


router.get('/', getAllDataForResult)


module.exports = router;