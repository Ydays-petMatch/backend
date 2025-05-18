/**
 * @swagger
 * /api/pets/filter:
 *   get:
 *     summary: Rechercher des animaux avec des filtres
 *     tags:
 *       - Pets
 *     parameters:
 *       - in: query
 *         name: location
 *         schema: { type: string }
 *       - in: query
 *         name: animalType
 *         schema: { type: string }
 *       - in: query
 *         name: animalSize
 *         schema: { type: string }
 *       - in: query
 *         name: duration
 *         schema: { type: string }
 *       - in: query
 *         name: careType
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Animaux filtrés
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
 *                     $ref: '#/components/schemas/Pet'
 */


const express = require("express");
const router = express.Router();
const filterController = require("../controllers/filter.controller");

router.get("/filter", filterController.filterPets);

module.exports = router;
