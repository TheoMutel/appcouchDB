// app/validation/livreValidations.js
const Joi = require("joi");

// Schéma pour un livre
const livreSchema = Joi.object({
  numero: Joi.number().integer().required(), // "numero" doit être un entier obligatoire
  titre: Joi.string().min(1).required(), // "titre" doit être une chaîne non vide obligatoire
  pages: Joi.array().items(Joi.string()).required(), // "pages" doit être un tableau de chaînes
});

module.exports = { livreSchema };
