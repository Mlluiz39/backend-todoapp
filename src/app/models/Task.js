const { Model, DataTypes } = require('sequelize')

class Task extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.UUIDV4,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
          required: true,
        },
        description: {
          type: DataTypes.STRING,
          allowNull: false,
          required: true,
        },
        done: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        user_id: {
          type: DataTypes.UUIDV4,
          allowNull: true,
        },
      },

      {
        sequelize,
      }
    )

    return this
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
    })
  }
}

module.exports = Task
