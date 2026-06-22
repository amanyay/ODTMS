const express = require('express')
const router = express.Router()

router.post('/', require('../../controllers/eyeBankAdminRoutesControllers/eyeBankDeleteRecipentsController'))

module.exports = router