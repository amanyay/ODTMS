const express = require('express');
const router = express.Router();



router.post('/', require('../controllers/changeNewPasswordControllers'));

module.exports = router;