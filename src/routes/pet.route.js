const express = require("express");
const router = express.Router();
const petController = require("../controllers/pet.controller");
const upload = require("../middlewares/upload");
const auth = require("../middlewares/checkJWT");

router.post("/", auth, upload.array("photos", 5), petController.createPet);
router.get("/", petController.getAllPets);
router.get("/:id", petController.getPetById);
router.put("/:id", auth, upload.array("photos", 5), petController.updatePet);
router.delete("/:id", auth, petController.deletePet);

router.delete("/:id/photos/:filename", petController.deletePetPhoto);
router.delete("/:id/photos", petController.deleteAllPetPhotos);

module.exports = router;
