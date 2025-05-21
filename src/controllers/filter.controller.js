const Contract = require("../models/contract");
const Pet = require("../models/pet");

exports.filterPets = async (req, res) => {
  try {
    const { location, animalType, animalSize, duration, careType } = req.query;
    console.log(req.query);

    const contractFilters = {};
    const petFilters = {};

    if (location) contractFilters.location = location;
    if (duration) contractFilters.duration = duration;
    if (careType) contractFilters.careType = careType;

    if (animalType) petFilters.animalType = animalType;
    if (animalSize) petFilters.animalSize = animalSize;

    const contracts = await Contract.find(contractFilters).populate({
      path: "pet",
      match: petFilters,
    });

    if (!contracts) return res.json({ message: "Contrat not found", code: 404 });

    const pets = contracts
      .filter(c => c.pet !== null)
      .map(c => c.pet);

    if (!pets) return res.json({ message: "Pet not found", code: 404 });

    return res.json({
      message: "Résultat de la recherche",
      code: 200,
      data: pets,
    });
  } catch (err) {
    console.error(err);
    return res.json({ message: "Erreur serveurr", code: 500 });
  }
};
