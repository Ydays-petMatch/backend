const Pet = require("../models/pet");
const User = require("../models/user");
const path = require("path");
const fs = require("fs");

// ➕ Créer un animal lié à l'utilisateur connecté
exports.createPet = async (req, res) => {
  try {
    const petData = req.body;

    // Vérif simples
    if (!["male", "femelle"].includes(petData.genre?.toLowerCase())) {
      return res.status(400).json({ error: "Genre invalide" });
    }

    const photoPaths = req.files.map(file => `../uploads/${file.filename}`);

    const pet = new Pet({
      ...petData,
      age: Number(petData.age),
      photos: photoPaths,
      owner: req.userId // assigné automatiquement
    });

    await pet.save();

    // Lier le pet à l'utilisateur
    await User.findByIdAndUpdate(req.userId, { $push: { pets: pet._id } });

    res.status(201).json(pet);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Voir tous les animaux
exports.getAllPets = async (req, res) => {
  try {
    const pets = await Pet.find().populate("owner");
    res.json(pets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Voir un animal
exports.getPetById = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id).populate("owner");
    if (!pet) return res.status(404).json({ message: "Animal non trouvé" });
    res.json(pet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Modifier un animal (seulement par son owner)
exports.updatePet = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) return res.status(404).json({ message: "Pet non trouvé" });

    if (pet.owner.toString() !== req.userId)
      return res.status(403).json({ error: "Non autorisé" });

    const updateData = req.body;

    if (req.files && req.files.length > 0) {
      const newPhotos = req.files.map(file => `../uploads/${file.filename}`);
      updateData.photos = [...pet.photos, ...newPhotos];
    }

    const updatedPet = await Pet.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true
    });

    res.json(updatedPet);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Supprimer un animal (et ses photos)
exports.deletePet = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) return res.status(404).json({ error: "Pet non trouvé" });

    if (pet.owner.toString() !== req.userId)
      return res.status(403).json({ error: "Non autorisé" });

    // Supprimer photos du disque
    for (const photo of pet.photos) {
      const filePath = path.join(__dirname, "..", photo);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await pet.deleteOne();

    res.json({ message: "Animal supprimé avec succès" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Voir tous les animaux d’un user
exports.getPetsByUser = async (req, res) => {
  try {
    const pets = await Pet.find({ owner: req.params.id });
    res.json(pets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



exports.deletePetPhoto = async (req, res) => {
  try {
    const { id, filename } = req.params;

    const pet = await Pet.findById(id);
    if (!pet) {
      return res.status(404).json({ message: "Animal non trouvé" });
    }

    // Vérifie si la photo existe dans le tableau
    const photoPath = `../uploads/${filename}`;
    const photoIndex = pet.photos.indexOf(photoPath);

    if (photoIndex === -1) {
      return res.status(404).json({ message: "Photo non trouvée" });
    }

    // Supprime du tableau
    pet.photos.splice(photoIndex, 1);
    await pet.save();

    // Supprime du disque
    const fullPath = path.join(__dirname, "..", "uploads", filename);
    fs.unlink(fullPath, (err) => {
      if (err) {
        console.warn("Photo supprimée du modèle mais pas du disque :", err.message);
      }
    });

    res.status(200).json({ message: "Photo supprimée avec succès" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteAllPetPhotos = async (req, res) => {
  try {
    const { id } = req.params;

    const pet = await Pet.findById(id);
    if (!pet) {
      return res.status(404).json({ message: "Animal non trouvé" });
    }

    // Supprimer les fichiers du disque
    for (const photo of pet.photos) {
      const filename = photo.split("../uploads/")[1];
      const filePath = path.join(__dirname, "..", "uploads", filename);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.warn(`Erreur suppression de ${filename} : ${err.message}`);
        }
      });
    }

    // Vider le tableau des photos
    pet.photos = [];
    await pet.save();

    res.status(200).json({ message: "Toutes les photos ont été supprimées" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
