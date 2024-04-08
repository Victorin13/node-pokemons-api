const { Sequelize, DataTypes } = require('sequelize');
const PokemonModel = require('./../models/pokemon');
const UserModel = require('./../models/user');

const sequelize = new Sequelize(
    'pokedex',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mariadb',
        dialectOptions: {
            timezone: 'Etc/GMT+1'
        },
        logging: (...msg) => console.log(msg)
    }
)

const Pokemon = PokemonModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);

const initDb = () => {
    return sequelize.sync()
    .then(_ => {

        console.log('La base de donnée a bien été initialisée !')
    });

}

module.exports = { 
    initDb, Pokemon, User
}