const express = require('express');
const router = express.Router();


router.post('/', require('../controllers/historyControllers'))


module.exports = router;