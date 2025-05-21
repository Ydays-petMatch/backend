const User = require("../models/user");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate("pets");
    return res.json({
      message: "Liste des utilisateurs récupérée avec succès",
      code: 200,
      data: users,
    });
  } catch (err) {
    return res.json({
      message: "Erreur serveur",
      code: 500,
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const userId = req.userToken.id;
    const user = await User.findById(userId).populate("pets");
    if (!user) {
      return res.json({
        message: "Utilisateur non trouvé",
        code: 404,
      });
    }
    return res.json({
      message: "Utilisateur trouvé",
      code: 200,
      data: user,
    });
  } catch (err) {
    return res.json({
      message: "Erreur serveur",
      code: 500,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const update = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!user) {
      return res.json({
        message: "Utilisateur non trouvé",
        code: 404,
      });
    }
    return res.json({
      message: "Utilisateur mis à jour avec succès",
      code: 200,
      data: user,
    });
  } catch (err) {
    return res.json({
      message: "Requête invalide",
      code: 400,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.json({
        message: "Utilisateur non trouvé",
        code: 404,
      });
    }
    return res.json({
      message: "Utilisateur supprimé avec succès",
      code: 200,
    });
  } catch (err) {
    return res.json({
      message: "Erreur serveur",
      code: 500,
    });
  }
};

exports.getMe = async (req, res) => {
  try {
    const id = req.userToken.id;
    if (!id) {
      return res.json({
        message: "Id requis",
        code: 400,
      });
    }
    const user = await User.findById(String(id));
    if (!user) {
      return res.json({
        message: "Utilisateur non trouvé",
        code: 404,
      });
    }
    return res.json({
      message: "Utilisateur authentifié",
      code: 200,
      data: user,
    });
  } catch (err) {
    console.error(`Erreur : ${err}`);
    return res.json({
      message: "Erreur serveur",
      code: 500,
    });
  }
};
