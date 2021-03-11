const express = require('express');

const gamesRouter = express.Router();

const Game = require('../models/game');

//ajout Headers pour éviter erreurs de CORS 'Cross Origin Resource Sharing'
gamesRouter.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


//API GET Liste des GAME
gamesRouter.get('/', async (req, res) => {
    const games = await Game.find({})
    res.status(200).json({ data: games })
})


// gamesRouter.get('/api/games', async (req, res, next) => {
//     //res.send(data);
//     // Game.find()
//     //     .then(
//     //         (games) => {
//     //             res.status(200).json(games);
//     //         }
//     //     )
//     //     .catch(
//     //         (error) => {
//     //             res.status(400).json({
//     //                 error: error
//     //             });
//     //         }
//     //     );

// });


//API GET --Obtenir un GAME
gamesRouter.get('/api/games/:id', (req, res) => {

    res.send(data.gameID[req.body.id]);
});


//requete POST  -- Créer un GAME
// gamesRouter.post('/api/game', (req, res) => {
//     //console.log(req.body);
//     const dateGame = new Date().toLocaleString();
//     console.log(dateGame);


//     const myGame = [

//         {
//             "dateDebut": dateGame,
//             "heureDebut": "",
//             "heureFin": "",
//             "equipes": []

//         }
//     ];
//     //res.send(myGame);

//     let myGameStringified = JSON.stringify(myGame, null, 2);
//     // On transforme le JSON en chaine de caractères

//     fs.writeFile('data.json', myGameStringified, (err) => {
//         if (err) throw err;
//         //renvoyer un message à l'admin// status 

//         res.send(
//             console.log('JSON écrit !')
//             //informer admin qu'une partie a été créé
//             //renvoyer le statut 200
//         )

//     });


//METTRE A JOUR un GAME
gamesRouter.put('/api/games/:id', (req, res, next) => {
    Game.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Game modifié !' }))
        .catch(error => res.status(400).json({ error }));
});

//SUPPRIMER un GAME
gamesRouter.delete('/api/games/:id', (req, res, next) => {
    Game.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Gamme supprimé !' }))
        .catch(error => res.status(400).json({ error }));
});




module.exports = gamesRouter;
