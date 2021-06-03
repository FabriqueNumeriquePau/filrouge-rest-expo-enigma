
const express = require('express');

const gamesRouter = express.Router();

const Game = require('../models/gameModel');

//ajout Headers pour éviter erreurs de CORS 'Cross Origin Resource Sharing'
gamesRouter.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


//API GET --Liste des GAMES
gamesRouter.get('/' +
    '', (req, res, next) => {
        Game.find().then(
            (games) => {
                res.status(200).json(games);
            }
        ).catch(
            (error) => {
                res.status(400).json({
                    error: error
                });
            }
        );
    });


//API GET --Obtenir un GAME
gamesRouter.get('/:id', (req, res) => {

    //res.send(data.gameID[req.body.id]);
    Game.findOne({
        _id: req.params.id
    }).then(
        (game) => {
            res.status(200).json(game);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );

});

//requete POST  -- Créer un GAME
gamesRouter.post('/', (req, res, next) => {
    const dateGame = new Date().toLocaleString();
    //console.log(dateGame);


    const game = new Game({
        dateDebut: dateGame,
        heureDebut: req.body.heureDebut,
        heureFin: req.body.heureFin,
        equipes: req.body.equipes
    });
    game.save().then(
        () => {
            res.status(201).json({
                message: 'Game enregistré'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
});

//Mettre à jour un GAME
gamesRouter.put('/:id', (req, res, next) => {

    Game.updateOne({ _id: req.params.id }, req.body).then(
        () => {
            res.status(201).json({
                message: 'Game updated!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
});

//Supprimer un GAME
gamesRouter.delete('/:id', (req, res, next) => {
    Game.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Game supprimé !' }))
        .catch(error => res.status(400).json({ error }));
});




module.exports = gamesRouter;
