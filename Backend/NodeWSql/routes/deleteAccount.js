const express = require('express');
const router = express.Router();


router.post('/', require('../controllers/deleteAccountControllers'))


module.exports = router;