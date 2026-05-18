const express = require('express');
const router = express.Router();


router.post('/', require('../../controllers/eyeBankAdminRoutesControllers/eyeTransplantCompleteApproveControllers'))
module.exports = router;