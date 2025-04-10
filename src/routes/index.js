const express = require('express');
const router = express.Router();
const petRoute = require('./pet.route');
const userRoute = require('./user.route');

router.use('/pet', petRoute);
router.use('/user', userRoute);

module.exports = router;