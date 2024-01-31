'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("employees", "department", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "HR"
    });

    // Remove the old 'department' column
    await queryInterface.removeColumn("employees", "department_id");
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
