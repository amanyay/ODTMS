const express = require('express');
const router = express.Router();

router.post('/',require('../controllers/loginControllers'))

module.exports = router;