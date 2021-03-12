// Récupération de mongoose
const mongoose = require('mongoose');


// Définition du Schema du joueur
const UserSchema = new mongoose.Schema({
  login : {type: String, required: true, unique: true},
  password : {type:String, required: true},
  admin: Boolean
});

// Création du model
const user = mongoose.model('User', UserSchema);

// Export du model
module.exports = user;