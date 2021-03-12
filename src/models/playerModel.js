// Récupération de mongoose
const mongoose = require('mongoose');


// Définition du Schema du joueur
const playerSchema = new mongoose.Schema({
  nom: String,
  prenom: String
});

// Création du model
const player = mongoose.model('Player', playerSchema);

// Export du model
module.exports = player;