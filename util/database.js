const Sequelize = require("sequelize");

const sequelize = new Sequelize(
 // Your database name,
 // Your user name,
 // Your password,
  {
    dialect: "mysql",
    host: "/*Your database host*/",
  }
);

module.exports = sequelize;

