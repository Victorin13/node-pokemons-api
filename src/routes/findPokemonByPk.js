const { Pokemon } = require('../db/sequelize');
const { ValidationError } = require('sequelize');
const auth = require('../auth/auth');
  
module.exports = (app) => {
  app.get('/api/pokemons/:id', auth, (req, res) => {
    Pokemon.findByPk(+req.params.id).then(pokemon => {
        if(pokemon === null) {
          const message = `Le pokémon demandé n'existe pas. Réessayez avec un autre identifiant.`
          return res.status(404).json({ message })
        }

        const message = 'Un pokémon a bien été trouvé.'
        res.json({ message, data: pokemon })
      })
      .catch(error => {
        if(error instanceof ValidationError) {
          return res.status(400).json({ message: error.message, data: error })
        }
        const message = `Le pokemon n'a pas pu être recuperé. Veuillez réessayer dans quelques instants !`
        res.status(500).json({ message, data: error })
      })
  })
}