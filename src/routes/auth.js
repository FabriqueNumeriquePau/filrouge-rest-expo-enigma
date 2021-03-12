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
    if(!req.body.login || !req.body.password){
        return res.status(400).json({ message: 'Login ou mot de passe manquant'})
    }

    // Vérification si le compte existe bien en base
    User.findOne({ where: { login: req.body.login }, raw: true})
        .then(user => {
            // Vérification si utilisateur existe
            if(user === null){
                return res.status(401).json({ message: 'Compte inexistant'})
            }            

            // Je vérifie si le mot de passe est bon
            bcrypt.compare(req.body.password, user.password)
                .then(test => {
                    // Si différent donc test=false donc mauvais mot de passe
                    if(!test){
                        return res.status(401).json({ message: 'bad password !'})
                    }

                    // Les 2 hash correspondent, création du token
                    const token = jwt.sign({
                        id: user._id,
                        login: user.login,
                    }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_DURING })
        
                    return res.json({ access_token: token })
                })
                .catch(err => res.status(401).json({ message: 'Password test error' }))
            
        })
        .catch(err => res.json({ message: 'Database error', error: err }))
});


module.exports = router;