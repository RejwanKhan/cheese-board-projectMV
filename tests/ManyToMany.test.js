const { sequelize } = require("../src/connection");
const { Cheese } = require("../models/Cheese");
const { Board } = require("../models/Board");
const { ShowCase } = require("../models/ShowCase");

//Making Many to Many Association
Cheese.belongsToMany(Board, { through: ShowCase });
Board.belongsToMany(Cheese, { through: ShowCase });

beforeEach(async () => {
  await sequelize.sync({ force: true });

  //Bulk Create the Board
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

  //Bulk Create the Cheeses

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
});

afterAll(async () => {
  await sequelize.sync({ force: true });
});

describe("testing Many to Many Association", () => {
  it("testing Many To Many Association between Board and Cheeses", async () => {
    const FrenchBoard = await Board.findByPk(1);
    const SoftBoard = await Board.findByPk(2);
    const BlockBoard = await Board.findByPk(3);

    await FrenchBoard.addCheese(1);
    await FrenchBoard.addCheese(3);
    await SoftBoard.addCheese(2);
    await BlockBoard.addCheese(4);

    const firstShowCase = await ShowCase.findByPk(1);
    const secondShowCase = await ShowCase.findByPk(2);
    const thirdShowCase = await ShowCase.findByPk(3);
    const fourthShowCase = await ShowCase.findByPk(4);

    //Tests
    expect(
      firstShowCase.CheeseId === 1 && firstShowCase.BoardId === 1
    ).toBeTruthy();
    expect(
      secondShowCase.CheeseId === 3 && secondShowCase.BoardId === 1
    ).toBeTruthy();
    expect(
      thirdShowCase.CheeseId === 2 && thirdShowCase.BoardId === 2
    ).toBeTruthy();
    expect(
      fourthShowCase.CheeseId === 4 && fourthShowCase.BoardId === 3
    ).toBeTruthy();
  });
});
