const express = require('express')
const router = express.Router()

router.post('/', require('../../controllers/superAdminRoutesControllers/superAdminUpdateProfileControllers'))
module.exports = router