
const express = require('express');
const{ handleChat} = require('../controllers/chatbotController')
const router = express.Router();



router.post('/chat', handleChat)


module.exports = router;