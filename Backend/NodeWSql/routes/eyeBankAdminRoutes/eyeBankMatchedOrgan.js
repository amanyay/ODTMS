const express = require('express');
const router = express.Router();


const urgencyOrder = {
    Urgent: 4,
    Low: 3,
}

router.get('/', require('../../controllers/eyeBankAdminRoutesControllers/eyeBankMatchedOrganControllers'))

module.exports = router;