/**
 * @swagger
 * tags:
 *   - name: Wishlist
 *     description: Gestion des favoris utilisateur (wishlist)
 */

/**
 * @swagger
 * /api/wishlist:
 *   get:
 *     summary: Récupérer la liste des animaux en favoris
 *     tags:
 *       - Wishlist
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des favoris récupérée
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 code:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 */

/**
 * @swagger
 * /api/wishlist:
 *   post:
 *     summary: Ajouter un animal à la wishlist
 *     tags:
 *       - Wishlist
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: petId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Animal ajouté aux favoris
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 code:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 */

/**
 * @swagger
 * /api/wishlist:
 *   delete:
 *     summary: Supprimer un animal de la wishlist
 *     tags:
 *       - Wishlist
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: petId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Animal retiré des favoris
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 code:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 */

const express = require("express");
const checkJWT = require("../middlewares/checkJWT");
const router = express.Router();

const whishlistController = require("../controllers/whishlist.controller");

router.get('/', checkJWT, whishlistController.getWhishlists);
router.post('/', checkJWT, whishlistController.addWhishlist);
router.delete('/', checkJWT, whishlistController.deleteWhishlist);

module.exports = router;
