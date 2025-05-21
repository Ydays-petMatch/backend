/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Authentification et enregistrement utilisateur
 */

/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Enregistrer un nouvel utilisateur
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *               profilePicture:
 *                 type: string
 *               admin:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Utilisateur créé
 */

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Connexion d'un utilisateur
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Connexion réussie
 */

const express = require("express");
const router = express.Router();
const userAuthController = require("../controllers/auth.controller");

// checkJWTentification
router.post("/register", userAuthController.register);
router.post("/login", userAuthController.login);

module.exports = router;