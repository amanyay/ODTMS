const express = require('express');
const router = express.Router();



router.post('/', require('../../controllers/eyeBankAdminRoutesControllers/eyeBankAddToWaitingListControllers'))
module.exports = router;