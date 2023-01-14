const { Model, DataTypes } = require('sequelize')
const bcrypt = require('bcryptjs')

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.VIRTUAL,
        password_hash: DataTypes.STRING,
      },

      {
        sequelize,
      }
    )

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        const salt = await bcrypt.genSalt(10)
        user.password_hash = await bcrypt.hash(user.password, salt)
      }
    })

    return this
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash)
  }

  static associate(models) {
    this.hasMany(models.Task, {
      foreignKey: 'user_id',
      as: 'tasks',
      onDelete: 'CASCADE',
    })
  }
}

module.exports = User
