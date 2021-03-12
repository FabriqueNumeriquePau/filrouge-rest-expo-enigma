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
  dateDebut: { type: Date, default: Date.now },
  heureDebut: String,
  heureFin: String,
  equipes: [teamSchema]
});

const game = mongoose.model('Game', gameSchema);


module.exports = game;