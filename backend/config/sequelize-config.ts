import { Sequelize } from "sequelize";
require("dotenv").config();

const config = require("./config");
const env_type = process.env.NODE_ENV || "development";

const sequelizeConnection: Sequelize = new Sequelize(
  config[env_type].database,
  config[env_type].username,
  config[env_type].password,
  {
    host: config[env_type].host,
    dialect: config[env_type].dialect,
    port: config[env_type].port,
  }
);

export default sequelizeConnection;
