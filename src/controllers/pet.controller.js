const Pet = require("../models/pet");
const User = require("../models/user");
const path = require("path");
const fs = require("fs");


exports.createPet = async (req, res) => {
  try {
    const petData = req.body;
    console.log('test id user  : ', req.userId);


    if (!["male", "femelle"].includes(petData.genre?.toLowerCase())) {
      return res.json({ message: "Genre invalide", code: 400 });
    }

    const photoPaths = req.files.map(file => `../uploads/${file.filename}`);

    const pet = new Pet({
      ...petData,
      age: Number(petData.age),
      photos: photoPaths,
      owner: req.userToken.id
    });

    const test = await pet.save();
    console.log('test save pet  : ', test);

    await User.findByIdAndUpdate(req.userId, { $push: { pets: pet._id } });

    return res.json({
      message: "Animal créé avec succès",
      code: 201,
      data: pet
    });
  } catch (err) {
    return res.json({ message: `Erreur lors de la création ${err}`, code: 400 });
  }
};

exports.getAllPets = async (req, res) => {
  try {
    const pets = await Pet.find().populate("owner");
    return res.json({
      message: "Liste des animaux récupérée",
      code: 200,
      data: pets
    });
  } catch (err) {
    return res.json({ message: "Erreur serveur", code: 500 });
  }
};

exports.getPetById = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id).populate("owner");
    if (!pet) return res.json({ message: "Animal non trouvé", code: 404 });

    return res.json({
      message: "Animal trouvé",
      code: 200,
      data: pet
    });
  } catch (err) {
    return res.json({ message: "Erreur serveur", code: 500 });
  }
};

exports.updatePet = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) return res.json({ message: "Animal non trouvé", code: 404 });

    if (pet.owner.toString() !== req.userToken.id)
      return res.json({ message: "Non autorisé", code: 403 });

    const updateData = req.body;

    if (req.files && req.files.length > 0) {
      const newPhotos = req.files.map(file => `../uploads/${file.filename}`);
      updateData.photos = [...pet.photos, ...newPhotos];
    }

    const updatedPet = await Pet.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true
    });

    return res.json({
      message: "Animal mis à jour avec succès",
      code: 200,
      data: updatedPet
    });
  } catch (err) {
    return res.json({ message: "Requête invalide", code: 400 });
  }
};

exports.deletePet = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) return res.json({ message: "Animal non trouvé", code: 404 });

    if (pet.owner.toString() !== req.userToken.id)
      return res.json({ message: "Non autorisé", code: 403 });

    for (const photo of pet.photos) {
      const filePath = path.join(__dirname, "..", photo);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await pet.deleteOne();

    return res.json({
      message: "Animal supprimé avec succès",
      code: 200
    });
  } catch (err) {
    return res.json({ message: "Erreur serveur", code: 500 });
  }
};

exports.getPetsByUser = async (req, res) => {
  try {
    const pets = await Pet.find({ owner: req.params.id });
    return res.json({
      message: "Animaux récupérés pour l'utilisateur",
      code: 200,
      data: pets
    });
  } catch (err) {
    return res.json({ message: "Erreur serveur", code: 500 });
  }
};


exports.deletePetPhoto = async (req, res) => {
  try {
    const { id, filename } = req.params;
    const pet = await Pet.findById(id);

    if (!pet) {
      return res.json({ message: "Animal non trouvé", code: 404 });
    }

    const photoPath = `../uploads/${filename}`;
    const photoIndex = pet.photos.indexOf(photoPath);

    if (photoIndex === -1) {
      return res.json({ message: "Photo non trouvée", code: 404 });
    }

    pet.photos.splice(photoIndex, 1);
    await pet.save();

    const fullPath = path.join(__dirname, "..", "uploads", filename);
    fs.unlink(fullPath, (err) => {
      if (err) {
        console.warn("Erreur suppression disque :", err.message);
      }
    });

    return res.json({
      message: "Photo supprimée avec succès",
      code: 200,
      data: pet.photos
    });
  } catch (err) {
    return res.json({ message: "Erreur serveur", code: 500 });
  }
};

exports.deleteAllPetPhotos = async (req, res) => {
  try {
    const { id } = req.params;
    const pet = await Pet.findById(id);

    if (!pet) {
      return res.json({ message: "Animal non trouvé", code: 404 });
    }

    for (const photo of pet.photos) {
      const filename = photo.split("../uploads/")[1];
      const filePath = path.join(__dirname, "..", "uploads", filename);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.warn(`Erreur suppression : ${err.message}`);
        }
      });
    }

    pet.photos = [];
    await pet.save();

    return res.json({
      message: "Toutes les photos ont été supprimées",
      code: 200
    });
  } catch (err) {
    return res.json({ message: "Erreur serveur", code: 500 });
  }
};
