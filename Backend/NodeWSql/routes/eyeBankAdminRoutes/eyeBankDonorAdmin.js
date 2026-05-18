const express = require('express');
const router = express.Router();

router.get('/', require('../../controllers/eyeBankAdminRoutesControllers/eyeBankDonorAdminControllers'))


module.exports = router;