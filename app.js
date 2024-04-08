const express = require('express');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const sequelize = require('./src/db/sequelize');

const app = express();
const port = 3030;

app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))
    .use(bodyParser.json())

// Connexion à la base de donnees
sequelize.initDb();

// Points de terminaisons
require('./src/routes/findAllPokemons')(app);
require('./src/routes/findPokemonByPk')(app);
require('./src/routes/createPokemon')(app);
require('./src/routes/updatePokemon')(app);
require('./src/routes/deletePokemon')(app);

// Gestion des erreurs 404
app.use(({res}) => {
    const message = 'Ressource introuvable, veuillez reessayer une autre URL !'
    res.status(404).json({message})
})

app.listen(port, () => {
    console.log(`Notre application demarre sur : http://localhost:${port}`);
});