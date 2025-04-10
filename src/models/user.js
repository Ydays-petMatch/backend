const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Email invalide"]
  },
  password: { type: String, required: true, minlength: 3 },

  phone: { type: String },
  address: { type: String },
  admin: { type: Boolean, default: false },
  profilePicture: { type: String }, // Chemin vers l'image (si upload)
  
  pets: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "pet"
  }],
  
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("user", userSchema);
