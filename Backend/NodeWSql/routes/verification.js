const express = require('express');
const router = express.Router();


router.post('/', require('../controllers/verificationControllers'))


module.exports = router;