const express = require('express');
const router = express.Router();


router.post('/', require('../controllers/recRequestsControllers'))


module.exports = router;