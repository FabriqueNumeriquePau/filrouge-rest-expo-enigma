const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3001;
const Game = require('./src/models/game')
const dotenv = require('dotenv')
dotenv.config({ path: `${__dirname}/src/config/.env` })
app.use(express.json())

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_TABLE}`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

const gamesRouter = require("./src/routes/games");
const teamsRouter = require("./src/routes/teams");
const playersRouter = require("./src/routes/players");
const authRouter = require('./src/routes/auth');

//ajout Headers pour éviter erreurs de CORS 'Cross Origin Resource Sharing'
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//app.use('/auth', authRouter);
app.use('/api/games', gamesRouter);
//app.use('/api/teams', teamsRouter);
//app.use('/api/players', playersRouter);


// app.get('/', async (req, res) => {
//     const games = await Game.find({})
//     res.status(200).json({ data: games })
// })


// app.post('/', (req, res) => {
//     const game = new Game(req.body);

//     game.save();
//     res.status(200).json(game);
// })

// ERREUR - NOT FOUND
app.get('*', (req, res) => {
    res.status(404).send("Personne n'est présent das l'antre de la bête.");
});


app.listen(port, () => {
    console.log('Server running on port ' + port);
})