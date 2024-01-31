module.exports = {
  development: {
    username: "postgres",
    password: "",
    database: "sequelize_db",
    host: "127.0.0.1",
    dialect: "postgres",
    port: 5433,
  },
  test: {
    username: "root",
    password: "",
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "postgres",
    password: "password",
    database: "simple_crud_db",
    host: "emp_api_db",
    dialect: "postgres",
    port: 5432,
  },
};
