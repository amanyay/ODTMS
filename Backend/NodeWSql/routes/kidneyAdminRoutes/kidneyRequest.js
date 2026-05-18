const express = require('express');
const router = express.Router();



router.post('/', require('../../controllers/kidneyAdminRoutesControllers/kidneyRequestControllers'))
module.exports = router;