const bcrypt = require('bcrypt');

/* Authentification : Créer un modèle User avec Sequelize */
module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'User',
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: 'Ce nom d\'utilisateur est dejà pris !'
        }
      },
      user_password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      timestamps: false
    },
    {
      hooks: {
        beforeCreate: async (user) => {
          // Générer un hachage pour le mot de passe
          const salt = await bcrypt.genSalt(10);
          const hash = await bcrypt.hash(user.user_password, salt);
          // Remplacer le mot de passe par le hachage
          user.user_password = hash;
        }
      }
    }
  )
}