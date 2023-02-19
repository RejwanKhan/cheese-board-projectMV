const { sequelize } = require("../src/connection");
const { DataTypes } = require("sequelize");

const Board = sequelize.define("Board", {
  type: DataTypes.STRING,
  description: DataTypes.STRING,
  rating: DataTypes.NUMBER,
});

module.exports = { Board };
