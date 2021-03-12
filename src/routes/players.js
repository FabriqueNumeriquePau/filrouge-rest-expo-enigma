const express = require('express');
const app = express();
const express = require('express')
const router = express.Router()





// // POST --/api/player
// app.post('/api/player', (req, res) => {
//     const playerinfo = req.body;
//     if (playerinfo.prenom != undefined && playerinfo.nom != undefined) {
//         const newPlayer = { "prenom": playerinfo.prenom, "nom": playerinfo.nom }
//         db.get('joueurs').push(newPlayer).write();
//         res.send(`Création d\'un joueur réussie !`);
//     } else {
//         res.send('Une erreur s\'est produite, veuillez réessayer en insérant des données !');
//     }
// });

// // GET --/api/players
// app.get('/api/players', (req, res) => {
//     res.send(data.joueurs);
// });

// // GET --/api/player/{id}
// app.get('/api/player/:id', (req, res) => {
//     res.send(data.joueurs[req.params.id]);
// });

// PUT --/api/players/{id}
app.put('/api/players/:id', (req, res) => {
    db.update('joueurs').find({ id: req.params.id}).write();
    res.send('Je met à jour un joueur !');
})

module.exports = router;
// // DELETE  --/api/players/{id}
// app.delete('/api/players/:id', (req, res) => {
//     db.get('joueurs').find({ id: req.params.id }).remove().write();
//     res.send('C\'est bon ! C\'est delete !');
// })

// // PUT --/api/players/{id}
// app.put('/api/players/:id', (req, res) => {
//     db.update('joueurs').find({ id: req.params.id }).write();
//     res.send('Je met à jour un joueur !');
// })