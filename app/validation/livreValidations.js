const Joi = require("joi");


const livreSchema = Joi.object({
  numero: Joi.number().integer().required(),
  titre: Joi.string().min(1).required(), 
  pages: Joi.array().items(Joi.string()).required(),
});

module.exports = { livreSchema };
