function checkAdmin(req, res, next) {
  if (req.user && req.user.statut === "admin") {
    return next();
  } else {
    const userStatut = req.user ? req.user.statut : "inconnu";
    return res.status(403).json({
      status: false,
      message: `L'utilisateur n'est pas admin (statut: ${userStatut})`,
    });
  }
}

module.exports = checkAdmin;
