const { sequelize } = require("../src/connection");
const { DataTypes } = require("sequelize");

const ShowCase = sequelize.define("ShowCase", {
  ProductId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

module.exports = { ShowCase };
