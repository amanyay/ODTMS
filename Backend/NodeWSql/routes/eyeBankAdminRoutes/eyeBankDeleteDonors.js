const express = require('express')
const router = express.Router();


router.post('/', require('../../controllers/eyeBankAdminRoutesControllers/eyeBankDeleteDonorsController'));

module.exports = router;