const express = require('express');
const router = express.Router();


router.post('/', require('../../controllers/superAdminRoutesControllers/superAdminSearchController'))
module.exports = router;