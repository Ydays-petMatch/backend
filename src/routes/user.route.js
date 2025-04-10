const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const auth = require("../middlewares/checkJWT");

// Authentification
router.post("/register", userController.register);
router.post("/login", userController.login);

// Routes protégées par authentification (optionnel)
router.get("/", auth, userController.getAllUsers);
router.get("/:id", auth, userController.getUserById);
router.put("/:id", auth, userController.updateUser);
router.delete("/:id", auth, userController.deleteUser);

module.exports = router;
