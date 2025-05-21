const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  race: { type: String, required: true },
  caracters: { type: String, required: true },
  weight: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  genre: { type: String, enum: ["male", "femelle"], required: true },
  photos: [{ type: String, required: false }],
  position: { type: String, required: true },
  description: { type: String, required: true },
  favoriteActivities: { type: String, required: true },
  foodHabits: { type: String, required: true },
  specificNeeds: { type: String, required: true },
  status: { type: String, enum: ["public", "prive"], required: true },
  // Référence au User connecté
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("pet", petSchema);
