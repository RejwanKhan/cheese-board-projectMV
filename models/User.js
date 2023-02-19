const { sequelize } = require("../src/connection");
const { DataTypes } = require("sequelize");

const Users = sequelize.define("Users", {
  name: DataTypes.STRING,
  email: DataTypes.STRING,
});

module.exports = { Users };
