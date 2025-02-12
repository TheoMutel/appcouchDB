const { livreSchema } = require("./livreValidations");

function validateLivre(req, res, next) {
  const { error } = livreSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
 
  next();
}

module.exports = validateLivre;
