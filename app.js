const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const dotenv = require('dotenv')
const cors = require('cors');
dotenv.config({ path: `${__dirname}/src/config/.env` })
const jwt = require('jsonwebtoken');

app.use(express.json())
app.use(cors())


mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    authSource: 'admin',
    auth: { user: process.env.DB_USER, password: process.env.DB_PASS }
})


    // mongoose.connect(mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_TABLE}`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch((err) => console.log('Connexion à MongoDB échouée !', err));

const gamesRouter = require("./src/routes/games");
const teamsRouter = require("./src/routes/teams");
const playersRouter = require("./src/routes/players");
const authRouter = require('./src/routes/auth');
const usersRouter = require('./src/routes/users');

//ajout Headers pour éviter erreurs de CORS 'Cross Origin Resource Sharing'
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//     next();
// });

app.use('/auth', authRouter);
app.use('/api/games', gamesRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/players', playersRouter);
app.use('/api/users', usersRouter);


// ERREUR - NOT FOUND
app.get('*', (req, res) => {
    res.status(404).send("Personne n'est présent dans l'antre de la bête.");
});


app.listen(port, () => {
    console.log('Server running on port ' + port);
})

