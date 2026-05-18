const express = require('express');
const router = express.Router();

router.post('/', require('../../controllers/eyeBankAdminRoutesControllers/eyeBankAdminProfileControllers'))

module.exports = router