const express = require('express');
const router = express.Router();


router.post('/', require('../controllers/homeControllers'))


module.exports = router;