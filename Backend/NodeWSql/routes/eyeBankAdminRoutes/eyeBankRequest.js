const express = require('express');
const router = express.Router();


router.post('/', require('../../controllers/eyeBankAdminRoutesControllers/eyeBankRequestControllers'))
module.exports = router;