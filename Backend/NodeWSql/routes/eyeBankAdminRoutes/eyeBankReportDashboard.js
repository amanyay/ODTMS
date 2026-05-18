const express = require('express')
const router = express.Router();
const eyeBankReportDashboardRoutes = require('../../controllers/eyeBankAdminRoutesControllers/eyeBankReportDashboardControllers')

router.get('/', eyeBankReportDashboardRoutes.eyeBankReportDashboardController)

module.exports = router