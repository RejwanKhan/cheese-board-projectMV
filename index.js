const { sequelize } = require("./src/connection");
const { Board } = require("./models/Board");
const { Cheese } = require("./models/Cheese");
const { Users } = require("./models/User");
const { ShowCase } = require("./models/ShowCase");

//Make a One to Many Relationship between Users and Boards
Users.hasMany(Board);
Board.belongsTo(Users);

//Make a Many to Many Relationship between Cheeses and Boards
Board.belongsToMany(Cheese, { through: ShowCase });
Cheese.belongsToMany(Board, { through: ShowCase });

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

  //MANY TO MANY ASSOCIATION

  //Bulk Creating Cheeses (We already Have Boards), Use ShowCase as Junction Table

  await Cheese.bulkCreate([
    { title: "Camembert", description: "A classic French Cheese" },
    {
      title: "ricotta",
      description: "Soft Cheese from Italy, perfect for your lasagna",
    },
    {
      title: "Brie",
      description:
        "A classic French Cheese which is a type of cow's milk cheese",
    },
    { title: "Chedder Cheese", description: "A block of Cheese From Britain" },
  ]);

  //MAKING THE ASSOCIATION BETWEEN BOARDS AND CHEESE
  // 1 : 1 , 1 : 3 , 2: 2, 3: 4

  const FrenchBoard = await Board.findByPk(1);
  const SoftBoard = await Board.findByPk(2);
  const BlockBoard = await Board.findByPk(3);

  await FrenchBoard.addCheese(1);
  await FrenchBoard.addCheese(3);
  await SoftBoard.addCheese(2);
  await BlockBoard.addCheese(4);
};

main();
