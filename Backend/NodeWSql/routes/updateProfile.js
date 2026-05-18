const express = require('express');
const router = express.Router();




router.post('/', require('../controllers/updateProfileControllers'))

module.exports = router;