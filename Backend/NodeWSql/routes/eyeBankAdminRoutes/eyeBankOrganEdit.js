const express = require('express');
const router = express.Router();



router.get('/', require('../../controllers/eyeBankAdminRoutesControllers/eyeBankOrganEditControllers'))

module.exports = router;