const express = require('express');
const router = express.Router();
const petRoute = require('./pet.route');
const userRoute = require('./user.route');
const wishlistRoute = require('./whishlist.route');
const authRoute = require('./auth.route');
const filterRoutes = require('./filter.routes');

router.use('/auth', authRoute);
router.use('/pet', petRoute);
router.use("/pets", filterRoutes);
router.use('/user', userRoute);
router.use("/whishlist", wishlistRoute);


module.exports = router;