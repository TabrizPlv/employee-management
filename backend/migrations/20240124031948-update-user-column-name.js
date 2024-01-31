'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Rename the column 'oldColumnName' to 'newColumnName' in the 'your_table' table
    await queryInterface.renameColumn('users', 'departmentId', 'department_id');
  },

  down: async (queryInterface, Sequelize) => {
    // Rollback logic here if needed
    // Note: Rolling back a column rename can be complex; ensure careful consideration
  },
};
