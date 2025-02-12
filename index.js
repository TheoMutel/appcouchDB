const express = require("express");
const jwt = require("jsonwebtoken");
const livreRouter = require("./app/router/livreRouter");

const app = express();
const PORT = 3000;

app.use(express.json());

const SECRET = "CLE";

let users = [
  {
    id_user: 1,
    email: "user.user@gmail.com",
    mdp: "azerty31",
    statut: "user",
  },
  {
    id_user: 2,
    email: "admin.admin@gmail.com",
    mdp: "azerty31",
    statut: "admin",
  },
];

/* POST http://localhost:3000/login */
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
      .json({ error: "le mail ou le mot de passe est incorrect." });
  }

  const payload = {
    id_user: userFound.id_user,
    email: userFound.email,
    statut: userFound.statut,
  };
  const token = jwt.sign(payload, SECRET, { expiresIn: "1h" });

  return res.json({
    message: ` ${email} est connecté`,
    token,
  });
});

app.use("/livres", livreRouter);

app.listen(PORT, () => {
  console.log(`Serveur lancé`);
});
