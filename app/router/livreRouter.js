const express = require("express");
const router = express.Router();

const LivreController = require("../controller/livreController");
const validateLivre = require("../midleware/valLivre");
const checkToken = require("../midleware/checkToken");
const checkAdmin = require("../midleware/checkAdmin");

router.get("/", checkToken, LivreController.getAll);
router.get("/:id", checkToken, LivreController.getById);

router.post("/", checkToken, checkAdmin, validateLivre, LivreController.create);
router.put(
  "/:id",
  checkToken,
  checkAdmin,
  validateLivre,
  LivreController.update
);
router.delete("/:id", checkToken, checkAdmin, LivreController.delete);

module.exports = router;
