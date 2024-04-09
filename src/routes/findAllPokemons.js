const { Pokemon } = require('../db/sequelize');
const { Op } = require('sequelize');
const auth = require('../auth/auth');
  
module.exports = (app) => {
  app.get('/api/pokemons', auth, (req, res) => {
    if(req.query.name) {
      const name = req.query.name;
      const limit = +req.query.limit || 5;

      if(name.length < 2) {
        const message = `Le terme de recherche doit contenir au minimum 2 caractères.`
        return res.status(400).json({ message })
      }

      Pokemon.findAndCountAll({
        where: {
          pokemon_name: {
            [Op.like]: `%${name}%`
          }
        },
        order: ['pokemon_name'],
        limit: limit
      }).then(({count, rows}) => {
        const message = `Il y a ${count} pokemons correspondant à la recherche ${name}`
        res.json({ message, data: rows })
      })
    } else {
      Pokemon.findAll({order: ['pokemon_name']})
      .then(pokemons => {
        const message = 'La liste des pokémons a bien été récupérée.'
        res.json({ message, data: pokemons })
      })
      .catch(error => {
        const message = `La liste des pokemons n'a pas pu être chargee. Veuillez reessayer dans quelques instants !`
        res.status(500).json({ message, data: error })
      })
    }
  })
}   