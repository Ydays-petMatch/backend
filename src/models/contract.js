const mongoose = require("mongoose");

const contractSchema = new mongoose.Schema({
  pet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pet",
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  guardian: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  animalType: {
    type: String,
    enum: ["Chien", "Chat", "Petit mammifère", "Oiseau", "Reptile", "Poisson", "Autres"],
    required: true,
  },
  animalSize: {
    type: String,
    enum: ["Petit (-10 kg)", "Moyen (10–25 kg)", "Grand (+25 kg)"],
  },
  duration: {
    type: String,
    enum: ["Week-end", "1 à 3 jours", "Long terme", "Urgent"],
    required: true,
  },
  careType: {
    type: String,
    enum: ["Chez le propriétaire", "Promenade uniquement", "Chez moi"],
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["en attente", "accepté", "refusé", "terminé"],
    default: "en attente",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Contract", contractSchema);
