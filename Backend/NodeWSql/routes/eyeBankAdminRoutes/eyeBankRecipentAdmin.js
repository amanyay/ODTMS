const express = require('express');
const router = express.Router();


router.get('/', require('../../controllers/eyeBankAdminRoutesControllers/eyeBankRecipentAdminControllers'))
module.exports = router;