const { Pokemon } = require('../db/sequelize');
const { ValidationError, UniqueConstraintError } = require('sequelize');
  
module.exports = (app) => {
  app.put('/api/pokemons/:id', (req, res) => {
    const id = +req.params.id
    Pokemon.update(req.body, {
      where: { pokemon_id: id }
    })
    .then(_ => {
      return Pokemon.findByPk(id).then(pokemon => {
        if(pokemon === null) {
          const message = 'Ressource introuvable, veuillez reessayer une autre URL !'
          return res.status(404).json({message})
        }
        const message = `Le pokémon ${pokemon.pokemon_name} a bien été modifié.`
        res.json({message, data: pokemon })
      })
    })
    .catch(error => {
      if(error instanceof ValidationError) {
        return res.status(400).json({ message: error.message, data: error })
      }

      if(error instanceof UniqueConstraintError) {
        return res.status(400).json({message: error.message, data: error})
      }

      const message = `Le pokemon n'a pas pu être modifie. Veuillez reessayer dans quelques instants !`
      res.status(500).json({ message, data: error })
    })
  })
}