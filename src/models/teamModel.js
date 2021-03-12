/* Chargement des variables necessaires */
const mongoose = require('mongoose');
const { Schema } = mongoose;


/*Définition du schéma d'une team */
const teamSchema = new Schema({
    score: Number,
    login: String,
    password: String,
    players: [
        { _id: String }
    ]
})

/* Création d'un model à partir du schéma */
const TeamModel = mongoose.model('Team', teamSchema)

/*Exportation du model*/
module.exports = TeamModel;