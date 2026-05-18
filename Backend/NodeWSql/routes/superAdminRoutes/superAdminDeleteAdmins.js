const express = require('express');
const router = express.Router();


router.post('/', require('../../controllers/superAdminRoutesControllers/superAdminDeleteAdminsControllers'))

module.exports = router