const express = require('express');
const router = express.Router();




router.post('/', require('../../controllers/superAdminRoutesControllers/adminAddNewAdminControllers'))
module.exports = router;