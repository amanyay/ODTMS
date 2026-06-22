const express = require('express');
const router = express.Router();
const middleware = require('../middleware/authmiddleware')


router.post('/', middleware, require('../controllers/homeControllers'))


module.exports = router;