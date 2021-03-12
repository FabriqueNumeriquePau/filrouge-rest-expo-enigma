const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3001;
const Game = require('./src/models/game.model')
const dotenv = require('dotenv')
const cors = require('cors');

dotenv.config({ path : `${__dirname}/src/config/.env`} )
app.use(express.json())

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_TABLE}`,
{useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

const gamesRouter = require("./src/routes/games")
const teamsRouter = require("./src/routes/teams")

const authRouter = require('./src/routes/auth')

app.use(cors())

app.use('/auth', authRouter);
app.use('/api/games', gamesRouter);
app.use('/api/teams', teamsRouter);


// ERREUR - NOT FOUND
app.get('*', (req, res)=>{
    res.status(404).send("Personne n'est présent das l'antre de la bête.");
});


app.listen(port, () => {
    console.log('Server running on port ' + port);
})