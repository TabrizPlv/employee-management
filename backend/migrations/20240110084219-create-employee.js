'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('employees', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      employeeName: {
        type: DataTypes.STRING, 
        allowNull: false,
      },
      salary: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      department: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
        ,
        allowNull: false,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
        ,
        allowNull: false,
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('employees');
  }
};