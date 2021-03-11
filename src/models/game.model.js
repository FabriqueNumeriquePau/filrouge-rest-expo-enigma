const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    nom: String,
    prenom: String
});

const teamSchema = new mongoose.Schema({
    score: Number,
    login: String,
    passe: String,
    joueurs: [playerSchema]
});

const gameSchema = new mongoose.Schema({
  dateDebut: String,
  heureDebut: String,
  heureFin: String,
  equipes: [teamSchema]
});

const Game = mongoose.model('Game', gameSchema);


module.exports = Game;