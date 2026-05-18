const express = require('express');
const router = express.Router();


router.post('/', require('../controllers/recFormControllers'))


module.exports = router;