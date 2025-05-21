const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone, address, profilePicture, admin } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.json({ message: "Email déjà utilisé", code: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
      address,
      profilePicture,
      admin: admin || false,
    });

    await user.save();

    return res.json({
      message: "Utilisateur créé",
      code: 201,
      data: { userId: user._id },
    });
  } catch (err) {
    return res.json({ message: "Erreur lors de l'inscription", code: 400 });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "Email ou mot de passe invalide", code: 401 });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.json({ message: "Email ou mot de passe invalide", code: 401 });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        admin: user.admin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "365d" }
    );

    return res.json({
      message: "Connexion réussie",
      code: 200,
      data: { token },
    });
  } catch (err) {
    return res.json({ message: "Erreur serveur", code: 500 });
  }
};
