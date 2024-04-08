const { Pokemon } = require('../db/sequelize')
  
module.exports = (app) => {
  app.delete('/api/pokemons/:id', (req, res) => {
    Pokemon.findByPk(+req.params.id).then(pokemon => {
        if(pokemon === null) {
            const message = 'Ressource introuvable, veuillez reessayer une autre URL !'
            return res.status(404).json({message})
        }
        const pokemonDeleted = pokemon;
        return Pokemon.destroy({
            where: { pokemon_id: pokemon.pokemon_id }
        })
        .then(_ => {
            const message = `Le pokémon avec l'identifiant n°${pokemonDeleted.pokemon_id} a bien été supprimé.`
            res.json({message, data: pokemonDeleted })
        })
        .catch(error => {
            const message = `Le pokemon n'a pas pu être supprimé. Veuillez reessayer dans quelques instants !`
            res.status(500).json({ message, data: error })
        })
    })
  })
}