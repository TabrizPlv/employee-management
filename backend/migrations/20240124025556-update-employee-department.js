"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("employees", "department_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 2,
    });

    // Add a foreign key constraint to the new column
    await queryInterface.addConstraint("employees", {
      fields: ["department_id"],
      type: "FOREIGN KEY",
      references: {
        table: "departments",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });

    // Migrate data from 'department' to 'department_id'
    await queryInterface.sequelize.query(`
      UPDATE employees
      SET department_id = departments.id
      FROM departments
      WHERE employees.department = departments.department;
    `);

    // Remove the old 'department' column
    await queryInterface.removeColumn("employees", "department");
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
