const express = require('express');
const router = express.Router();



router.post('/', require('../../controllers/superAdminRoutesControllers/superAdminFetchAdminsController'))
module.exports = router;