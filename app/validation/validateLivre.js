// app/validation/validateLivre.js
const { livreSchema } = require("./livreValidations");

function validateLivre(req, res, next) {
  const { error } = livreSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  // Si tout est OK, on passe la main au prochain middleware ou contrôleur
  next();
}

module.exports = validateLivre;
