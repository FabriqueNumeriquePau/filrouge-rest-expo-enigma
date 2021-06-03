/**** Chargement des modules nécessaires */
const express = require("express");
const router = express.Router();
const UserModel = require("./../models/userModel");
const bcrypt = require("bcrypt");

router.get("/:id", (req, res) => {
  UserModel.find({ _id: req.params.id })
    .then((user) => {
      res.send(user);
      res.status(200);
    })
    .catch((err) => res.json({ message: "Database error", error: err }));
});

router.post("/add", (req, res) => {
  try {
    // Hashage du mot de passe
    bcrypt
      .hash(req.body.password, parseInt(process.env.BCRYPT_SALT_ROUND))
      .then((hash) => {
        // Formatage du model
        const userM = new UserModel();
        userM.login = req.body.login;
        userM.password = hash;
        userM.admin = req.body.admin;
        // Enregistrement d'un utilisateur admin dans la base de données
        userM.save();
        res.status(200).json(userM);
      })
      .catch((err) => res.json({ message: "Password hash error", error: err }));
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.put("/edit/:id", (req, res) => {
  // Vérifier si le champ id est présent
  if (!req.params.id) {
    return res.status(400).json({ message: "Informations manquantes" });
  }
  const newPassword = req.body.newPassword;

  //Vérification de la présence de l'utilisateur dans la database et récupération de son mot de passe.
  UserModel.find({ _id: req.params.id })
    .then((user) => {
      //Comparaison entre les anciens mot de passe
      bcrypt.compare(
        req.body.lastPassword,
        user[0].password,
        function (err, isMatch) {
          if (err) {
            throw err;
          } else if (!isMatch) {
            console.log("L'ancien mot de passe n'est pas le bon");
          } else {
            console.log("Password matches!");
            // Hash du nouveau mot de passe
            bcrypt
              .hash(newPassword, parseInt(process.env.BCRYPT_SALT_ROUND))
              .then((hash) => {
                // Changement de mot de passe en base de données
                
                UserModel.updateOne({_id: req.params.id}, { password: hash })
                  .then(console.log("Données modifiées"))
                  .catch((err) => res.send("Une erreur s'est produit" + err));
              })
              .catch((err) =>
                res.json({ message: "Password hash error", error: err })
              );
          }
        }
      );
      res.send(user);
      res.status(200);
    })
    .catch((err) =>
      res.json({
        message:
          "Database error, L'utilisateur n'est pas présent en base de données",
        error: err,
      })
    );
});

router.delete("/delete/:id", (req, res) => {
  UserModel.findByIdAndDelete(req.params.id, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.send(data + "Données suprimées");
      console.log("Data deleted");
    }
  });
});

module.exports = router;
