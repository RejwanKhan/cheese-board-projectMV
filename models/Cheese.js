const { sequelize } = require("../src/connection");
const { DataTypes } = require("sequelize");

const Cheese = sequelize.define("Cheese", {
  title: DataTypes.STRING,
  description: DataTypes.STRING,
});

module.exports = { Cheese };
