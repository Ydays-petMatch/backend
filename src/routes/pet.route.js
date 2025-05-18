/**
 * @swagger
 * tags:
 *   - name: Pets
 *     description: Gestion des animaux
 */

/**
 * @swagger
 * /api/pet:
 *   post:
 *     summary: Créer un animal
 *     tags:
 *       - Pets
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - genre
 *               - age
 *             properties:
 *               name:
 *                 type: string
 *               genre:
 *                 type: string
 *                 enum: [male, femelle]
 *               age:
 *                 type: integer
 *               photos:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Animal créé
 */

/**
 * @swagger
 * /api/pet:
 *   get:
 *     summary: Récupérer tous les animaux
 *     tags:
 *       - Pets
 *     responses:
 *       200:
 *         description: Liste des animaux
 */

/**
 * @swagger
 * /api/pet/{id}:
 *   get:
 *     summary: Récupérer un animal par ID
 *     tags:
 *       - Pets
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Animal trouvé
 *       404:
 *         description: Animal non trouvé
 */

/**
 * @swagger
 * /api/pet/{id}:
 *   put:
 *     summary: Mettre à jour un animal
 *     tags:
 *       - Pets
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *               photos:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Animal mis à jour
 */

/**
 * @swagger
 * /api/pet/{id}:
 *   delete:
 *     summary: Supprimer un animal
 *     tags:
 *       - Pets
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Animal supprimé
 */

/**
 * @swagger
 * /api/pet/{id}/photos/{filename}:
 *   delete:
 *     summary: Supprimer une photo d'un animal
 *     tags:
 *       - Pets
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: filename
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Photo supprimée
 */

/**
 * @swagger
 * /api/pet/{id}/photos:
 *   delete:
 *     summary: Supprimer toutes les photos d'un animal
 *     tags:
 *       - Pets
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Toutes les photos supprimées
 */

const express = require("express");
const router = express.Router();
const petController = require("../controllers/pet.controller");
const upload = require("../middlewares/upload");
const checkJWT = require("../middlewares/checkJWT");

router.post("/", checkJWT, upload.array("photos", 5), petController.createPet);
router.get("/", petController.getAllPets);
router.get("/:id", petController.getPetById);
router.put("/:id", checkJWT, upload.array("photos", 5), petController.updatePet);
router.delete("/:id", checkJWT, petController.deletePet);

router.delete("/:id/photos/:filename", petController.deletePetPhoto);
router.delete("/:id/photos", petController.deleteAllPetPhotos);

module.exports = router;
