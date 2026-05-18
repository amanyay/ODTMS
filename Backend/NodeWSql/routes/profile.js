const express = require('express');
const router = express.Router();

router.post('/', require('../controllers/profileControllers'))

module.exports = router;