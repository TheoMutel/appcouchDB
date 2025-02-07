// index.js
const express = require("express");
const jwt = require("jsonwebtoken");
const livreRouter = require("./app/router/livreRouter");

const app = express();
const PORT = 3000;

app.use(express.json());

const SECRET = "MA_CLE_SECRETE_DE_DEMO";

let users = [
  {
    id_user: 1,
    email: "elias.nodon@gmail.com",
    mdp: "azerty31",
    statut: "admin",
  },
  {
    id_user: 2,
    email: "theo.mutel@gmail.com",
    mdp: "azerty31",
    statut: "user",
  },
];

//route login permettant de se connecter avec un email et un mot de passe et de récupérer un token selon le statut de l'utilisateur
app.post("/login", (req, res) => {
  const { email, mdp } = req.body;
  if (!email || !mdp) {
    return res.status(400).json({
      error: "Veuillez fournir email et mdp",
    });
  }

  const userFound = users.find((u) => u.email === email && u.mdp === mdp);
  if (!userFound) {
    return res
      .status(401)
      .json({ error: "l'email ou le mot de passe est incorrect." });
  }

  const payload = {
    id_user: userFound.id_user,
    email: userFound.email,
    statut: userFound.statut,
  };
  const token = jwt.sign(payload, SECRET, { expiresIn: "1h" });

  return res.json({
    message: `Utilisateur ${email} connecté`,
    token,
  });
});

app.use("/livres", livreRouter);

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
