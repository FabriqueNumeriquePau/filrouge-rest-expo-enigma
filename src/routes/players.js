const express = require('express');
const PlayerModel = require('./../models/playerModel');
const router = express.Router()

//ajout Headers pour éviter erreurs de CORS 'Cross Origin Resource Sharing'
router.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


// GET --/api/players
router.get('/', (req, res) => {
    PlayerModel.find()
        .then(players => {
            res.send(players);
            res.status(202);
        })
        .catch(err => res.json ({ message : "Database error", error:err}))
});

// POST --/api/player/new
 router.post('/new', (req, res) => {
     const playerinfo = req.body;
     if (playerinfo.prenom != undefined && playerinfo.nom != undefined) {
          // Formatage du model
            const newPlayer = new PlayerModel();
            newPlayer.prenom = playerinfo.prenom;
            newPlayer.nom = playerinfo.nom
            // Enregistrement de l'équipe dans la base de données
            newPlayer.save();
        res.status(201).json(newPlayer);
        res.send(`Création d\'un joueur réussie !`);
     } else {
         res.send('Une erreur s\'est produite, veuillez réessayer en insérant des données !');
    }
 });


// GET --/api/player/{id}
 router.get('/:id', (req, res) => {
     PlayerModel.findOne({ _id: req.params.id }).then(player => {
         res.status(200).send(player);
     })
     .catch(error => res.send(`Une erreur s'est produite ! \n ${error}`))
 });

// PUT --/api/players/{id}
router.put('/:id', (req, res) => {
    if(!req.params.id) {
        res.status(406).send("Merci de selectionner l'identifiant du jouer a modifié !");
    }

    PlayerModel.updateOne( { _id: req.params.id}, req.body)
    .then(
        res.status(201).send("Les données ont étés modifier !")
    )
    .catch(error => res.send(`Une erreur s'est produite ! \n ${error}`))
})

// DELETE  --/api/players/{id}
router.delete('/:id', (req, res) => {
    PlayerModel.deleteOne({ _id: req.params.id }).then(player => {
        res.status(200).send(player);
    })
    .catch(error => res.send(`Une erreur s'est produite ! \n ${error}`))
})

module.exports = router;