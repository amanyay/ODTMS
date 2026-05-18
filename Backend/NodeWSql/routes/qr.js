const express = require('express');
const router = express.Router();

router.use('/', require('../controllers/qrControllers'));
module.exports = router;