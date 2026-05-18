const express = require('express');
const router = express.Router();



router.post('/', require('../../controllers/kidneyAdminRoutesControllers/kidneyRecipentsControllers'))
module.exports = router;