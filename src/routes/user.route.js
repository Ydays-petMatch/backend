/**
 * @swagger
 * tags:
 *   - name: User
 *     description: Gestion des utilisateurs et authentification
 */


/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Récupérer tous les utilisateurs (protégé JWT)
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des utilisateurs
 */

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: Récupérer un utilisateur par ID (protégé JWT)
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Utilisateur trouvé
 */

/**
 * @swagger
 * /api/user/{id}:
 *   put:
 *     summary: Mettre à jour un utilisateur (protégé JWT)
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Mise à jour réussie
 */

/**
 * @swagger
 * /api/user/{id}:
 *   delete:
 *     summary: Supprimer un utilisateur (protégé JWT)
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Utilisateur supprimé
 */

/**
 * @swagger
 * /api/user/self/me:
 *   get:
 *     summary: Récupérer l'utilisateur connecté (JWT)
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Utilisateur authentifié
 */


const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const checkJWT = require("../middlewares/checkJWT");


// Routes protégées par checkJWTentification (optionnel)
router.get("/", checkJWT, userController.getAllUsers);
router.get("/:id", checkJWT, userController.getUserById);
router.put("/:id", checkJWT, userController.updateUser);
router.delete("/:id", checkJWT, userController.deleteUser);
router.get("/self/me", checkJWT, userController.getMe);

module.exports = router;
