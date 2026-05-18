const express = require('express');
const router = express.Router();

router.post("/", require('../controllers/signupControllers'));
module.exports = router;