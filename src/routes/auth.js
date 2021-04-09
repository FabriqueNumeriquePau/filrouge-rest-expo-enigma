/****************************************/
/*** Chargement des modules nécessaires */
const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

/*******************************/
/*** Chargement du modèle User */
const User = require('../models/userModel')

/*******************************************/
/*** Routage du système d'authentification */
router.post('/', (req, res) => {

    if (!req.body.login || !req.body.password) {
        return res.status(400).json({ message: "login ou mot de passe manquant" })
    }
    console.log(req.body);
    // Vérification si le compte existe bien en base
    User.find({ login: req.body.login })
        .then(user => {
            console.log('user:', user);
            // Vérification si utilisateur existe
            if (user === null) {
                return res.status(401).json({ message: 'Compte inexistant' })
            }
            // //je vérifie si il est admin
            // if (user[0].admin =='true'){

            // }
            // Je vérifie si le mot de passe est bon
            bcrypt.compare(req.body.password, user[0].password)
                .then(test => {
                    // Si différent donc test=false donc mauvais mot de passe
                    if (!test) {
                        return res.status(401).json({ message: 'bad password !' })
                    }
                    console.log('login', process.env.JWT_SECRET)
                    // Les 2 hash correspondent, création du token
                    const token = jwt.sign({
                        id: user[0]._id,
                        login: user[0].login,
                    }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_DURING })
                    console.log('token', token)
                    return res.json({ access_token: token })
                })
                .catch(err => res.status(401).json({ message: 'Password test error' }))

        })

        .catch(err => res.json({ message: 'Database error', error: err }))
});


module.exports = router;