// app/controller/livreController.js
const LivreModel = require("../model/livreModel");

class LivreController {
  static async getAll(req, res) {
    try {
      const livres = await LivreModel.getAll();
      res.json(livres);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération des livres." });
    }
  }

  static async getById(req, res) {
    const numero = req.params.id;
    try {
      const livre = await LivreModel.getById(numero);
      res.json({
        message: `Le livre numéro ${numero} a été trouvé.`,
        livre: livre,
      });
    } catch (error) {
      if (error.statusCode === 404) {
        res.status(404).json({
          error: `Le livre numéro ${numero} n'existe pas.`,
        });
      } else {
        res
          .status(500)
          .json({ error: "Erreur lors de la récupération du livre." });
      }
    }
  }

  static async create(req, res) {
    const { numero, titre, pages } = req.body;
    if (!numero || !titre || !Array.isArray(pages)) {
      return res.status(400).json({
        error: "Veuillez fournir 'numero', 'titre' et un tableau 'pages'.",
      });
    }

    try {
      const result = await LivreModel.create({ numero, titre, pages });
      res.status(201).json({
        message: "Livre ajouté avec succès.",
        livre: { numero, titre, pages },
        couchResponse: result,
      });
    } catch (error) {
      if (error.statusCode === 409) {
        res.status(400).json({
          error: `Un livre avec le numéro ${numero} existe déjà.`,
        });
      } else {
        res.status(500).json({ error: "Erreur lors de la création du livre." });
      }
    }
  }

  static async update(req, res) {
    const numero = req.params.id;
    const { titre, pages } = req.body;
    try {
      const result = await LivreModel.update(numero, { titre, pages });
      res.json({
        message: `Le livre numéro ${numero} a été mis à jour.`,
        couchResponse: result,
      });
    } catch (error) {
      if (error.statusCode === 404) {
        res.status(404).json({
          error: `Le livre numéro ${numero} n'existe pas.`,
        });
      } else {
        res
          .status(500)
          .json({ error: "Erreur lors de la mise à jour du livre." });
      }
    }
  }

  static async delete(req, res) {
    const numero = req.params.id;
    try {
      const result = await LivreModel.delete(numero);
      res.json({
        message: `Le livre numéro ${numero} a été supprimé.`,
        couchResponse: result,
      });
    } catch (error) {
      if (error.statusCode === 404) {
        res.status(404).json({
          error: `Le livre numéro ${numero} n'existe pas.`,
        });
      } else {
        res
          .status(500)
          .json({ error: "Erreur lors de la suppression du livre." });
      }
    }
  }
}

module.exports = LivreController;
