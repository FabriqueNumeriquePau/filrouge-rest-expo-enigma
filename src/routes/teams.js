/**** Chargement des modules nécessaires */
const express = require('express')
const router = express.Router()
const TeamModel = require('./../models/teamModel')
const bcrypt = require('bcrypt')

router.get('/', (req, res) => {
    console.log("Récupération des teams")
    TeamModel.find()
        .then(teams => {
            res.send(teams);
            res.status(200);
        })
        .catch(err => res.json ({ message : "Database error", error:err}))
})

router.get('/:id', (req, res) => {
    console.log("Récupération des teams", req.params.id)
    TeamModel.find({_id : req.params.id})
        .then(team => {
            res.send(team);
            res.status(200);
        })
        .catch(err => res.json ({ message : "Database error", error:err}))
})

router.post('/add', (req, res) => {
    try {
         // Hashage du mot de passe
         bcrypt.hash(req.body.password, parseInt(process.env.BCRYPT_SALT_ROUND))
         .then(hash => {
             // Formatage du model
            const teamM = new TeamModel();
            teamM.score = 0;
            teamM.login = req.body.login
            teamM.password= hash
            teamM.players= req.body.players
            // Enregistrement de l'équipe dans la base de données
            teamM.save();
        res.status(200).json(teamM);
        }).catch(err => res.json({ message: 'Password hash error', error: err }))
    }
    catch(error){
        console.log(error);
        res.sendStatus(500);
    }
})

router.put('/edit/:id', (req, res) => {
    // Vérifier si le champ id est présent
    if(!req.params.id){
        return res.status(400).json({ message: 'Informations manquantes'})
    }

    bcrypt.hash(req.body.password, parseInt(process.env.BCRYPT_SALT_ROUND))
    .then(hash => {
        // On a reçu le mot de passe hashé on peut enregistrer le nouveau compte
        req.body.password = hash

        TeamModel.updateOne({_id: req.params.id}, req.body)
        .then(
            res.status(200).json({ message: "Données modifiées"}),
        )
        .catch(err => res.send("Une erreur s'est produit"+err));

    })
    .catch(err => res.json({ message: 'Password hash error', error: err })) 
})

router.delete('/delete/:id', (req, res) => {
    TeamModel.findByIdAndDelete((req.params.id),
    function(err, data){
        if(err){
            console.log(err);
        }
        else{
            res.send(data  + "Données suprimées");
            console.log("Data deleted");
        }
    });
});


module.exports = router;