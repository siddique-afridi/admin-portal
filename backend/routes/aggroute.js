const express = require('express');
const {aggregatePractice, getUserBYCountry} = require('../controllers/aggregationPractice/aggregation');
const router  = express.Router();

router.post('/test', aggregatePractice)
router.get('/', getUserBYCountry)

module.exports = router;