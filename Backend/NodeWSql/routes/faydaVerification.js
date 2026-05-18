const express = require('express');
const router = express.Router();



router.post('/', require('../controllers/faydaVerificationControllers'));

module.exports = router;