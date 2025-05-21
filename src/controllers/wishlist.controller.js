const Pet = require("../models/pet");
const User = require("../models/user");

exports.addWishlist = async (req, res) => {
    try {
        const userId = req.userToken.id;
        const user = await User.findById(String(userId));
        const pet = await Pet.findById(String(req.query.petId));
        if (!user) {
            return res.json({
                message: "User not found",
                code: 404,
            });
        }
        if (!user.wishlist) {
            user.wishlist = [];
        }
        if (!pet) {
            return res.json({
                message: "PetId not found",
                code: 400,
            });
        }
        if (user.wishlist.includes(req.query.petId)) {
            return res.json({
                message: "Pet already in wishlist",
                code: 400,
            });
        }
        user.wishlist.push(req.query.petId);
        await user.save();
        return res.json({
            message: "Pet added to wishlist successfully",
            code: 200,
            data: user.wishlist,
        });
    } catch (error) {
        console.error(error);
        return res.json({
            message: "Internal server error",
            code: 500,
        });
    }
};

exports.getWishlists = async (req, res) => {
    try {
        const userId = req.userToken.id;
        const user = await User.findById(userId).populate("wishlist");
        if (!user) {
            return res.json({
                message: "User not found",
                code: 404,
            });
        }
        return res.json({
            message: "wishlist found",
            code: 200,
            data: user.wishlist,
        });
    } catch (error) {
        console.error(error);
        return res.json({
            message: "Internal server error",
            code: 500,
        });
    }
};

exports.deleteWishlist = async (req, res) => {
    try {
        const userId = req.userToken.id;
        const petId = req.query.petId;
        const user = await User.findById(userId);
        const pet = await Pet.findById(petId);
        if (!petId) {
            return res.json({
                code: 404,
                message: "petId not found",
            });
        }
        if (!user) {
            return res.json({
                message: "User not found",
                code: 404,
            });
        }
        if (!pet) {
            return res.json({
                message: "Pet not found",
                code: 404,
            });
        }
        if (!user.wishlist.includes(petId)) {
            return res.json({
                message: "Pet not in wishlist",
                code: 400,
            });
        }
        
        user.wishlist = user.wishlist.filter(
            (id) => id != petId
        );
        await user.save();
        return res.json({
            message: "Success",
            code: 200,
            data: user.wishlist,
        });
    } catch (err) {
        console.log(`erreur : ${err}`);
        return res.json({
            message: "bad request",
            code: 400,
        });
    }
};
