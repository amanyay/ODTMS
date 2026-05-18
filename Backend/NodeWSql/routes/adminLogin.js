
const express = require('express');
const router = express.Router();
const adminLoginRoutes = require('../controllers/adminLoginControllers')


router.post('/', adminLoginRoutes.adminLoginController)

module.exports = router;