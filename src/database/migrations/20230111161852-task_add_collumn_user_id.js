'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('tasks', 'user_id', Sequelize.UUID)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('tasks', 'user_id')
  },
}
