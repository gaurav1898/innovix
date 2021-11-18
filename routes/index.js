const express = require('express');
const router = express.Router();

//Defining routes after /api

router.use('/user', require('./user'));
router.use('/faq', require('./faq'));

module.exports = router;