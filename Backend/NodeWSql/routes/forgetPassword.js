const express = require('express');
const router = express.Router();




router.post('/', require('../controllers/forgetPasswordControllers'))

module.exports = router
