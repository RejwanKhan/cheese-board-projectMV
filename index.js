const { sequelize } = require("./src/connection");
const { Board } = require("./models/Board");
const { Cheese } = require("./models/Cheese");
const { Users } = require("./models/User");
const { ShowCase } = require("./models/ShowCase");

//Make a One to Many Relationship between Users and Boards
Users.hasMany(Board);
Board.belongsTo(Users);

const main = async () => {
  await sequelize.sync({ force: true });

  //Bulk Create Users
  await Users.bulkCreate([
    { name: "Rejwan", email: "rejwankhanofficial@gmail.com" },
    { name: "Diogo", email: "Diogo@gmail.com" },
    { name: "John", email: "John@gmail.com" },
  ]);

  //Bulk Create Boards
  await Board.bulkCreate([
    {
      type: "French Cheeses Board",
      description: "Fresh soft Cheese From France",
      rating: 4,
    },
    {
      type: "Soft Cheese Board",
      description: "Boards for Soft Cheeses, Perfect for Pizzas",
      rating: 3,
    },
    {
      type: "Block of Cheeses Board ",
      description: "A board full of various types of cheeses but in blocks ",
      rating: 2,
    },
  ]);

  //Now Make the One To Many associations between Board and Users

  // Rejwan = Soft Cheese Board , Diogo = Block of Cheeses Board, John = French Cheese Board

  const rejwan = await Users.findByPk(1);
  const diogo = await Users.findByPk(2);
  const john = await Users.findByPk(3);

  await rejwan.addBoard(2);
  await diogo.addBoard(3);
  await john.addBoard(1);
};

main();
