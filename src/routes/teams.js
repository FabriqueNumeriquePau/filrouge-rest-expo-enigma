/**** Chargement des modules nécessaires */
const express = require('express')
const router = express.Router()
const TeamModel = require('./../models/teamModel')
const bcrypt = require('bcrypt')

router.get('/index', (req, res) => {
    console.log("Récupération des teams")
    TeamModel.find()
        .then(teams => {
            res.send(teams);
            res.status(200);
        })
        .catch(err => res.json ({ message : "Database error", error:err}))
})

router.post('/add', (req, res) => {
    console.log("Le body", req)
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

router.put('/edit', (req, res) => {
    // Vérifier si le champ id est présent
    if(!req.body.id){
        return res.status(400).json({ message: 'Informations manquantes'})
    }

    TeamModel.findByIdAndUpdate(req.params.team_id)
        .then(
            res.status(200),
            console.log("Données modifiées")
        )
        .catch(err => res.json ({ message : "Database error", error:err}));
})

router.delete('/delete/:id', (req, res) => {
    TeamModel.findByIdAndDelete((req.params.id),
    function(err, data){
        if(err){
            console.log(err);
        }
        else{
            res.send(data);
            console.log("Data deleted");
        }
    });
});


module.exports = router;