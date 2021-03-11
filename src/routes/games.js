const express = require('express');

const gamesRouter = express.Router();




//API GET Liste des GAME
gamesRouter.get('/api/games', (req, res) => {

    res.send(data);
});


//API GET --Obtenir un GAME
gamesRouter.get('/api/games/:idGame', (req, res) => {

    res.send(data.gameID[req.body.idGame]);
});


//requete POST  -- Créer une GAME
gamesRouter.post('/api/game', (req, res) => {
    //console.log(req.body);
    const dateGame = new Date().toLocaleString();
    console.log(dateGame);


    const myGame = [

        {
            "dateDebut": dateGame,
            "heureDebut": "",
            "heureFin": "",
            "equipes": []

        }
    ];
    //res.send(myGame);

    let myGameStringified = JSON.stringify(myGame, null, 2);
    // On transforme le JSON en chaine de caractères

    fs.writeFile('data.json', myGameStringified, (err) => {
        if (err) throw err;
        //renvoyer un message à l'admin// status 

        res.send(
            console.log('JSON écrit !')
            //informer admin qu'une partie a été créé
            //renvoyer le statut 200
        )
    });








});












module.exports = gamesRouter;
