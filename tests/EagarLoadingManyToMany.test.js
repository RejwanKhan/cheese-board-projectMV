const { sequelize } = require("../src/connection");
const { Cheese } = require("../models/Cheese");
const { Board } = require("../models/Board");
const { ShowCase } = require("../models/ShowCase");

//Making Many To Many Association

Cheese.belongsToMany(Board, { through: ShowCase });
Board.belongsToMany(Cheese, { through: ShowCase });

beforeEach(async () => {
  await sequelize.sync({ force: true });

  //Bulk Create the Boards
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

  //Making the Associations between Cheese and Boards
});

afterAll(async () => {
  await sequelize.sync({ force: true });
});

describe("EagarLoading tests within a Many to Many relationship", () => {
  it("Board can be loaded with its Cheeses", async () => {
    const FrenchBoard = await Board.findByPk(1);
    const SoftBoard = await Board.findByPk(2);
    const BlockBoard = await Board.findByPk(3);

    await FrenchBoard.addCheese(1);
    await FrenchBoard.addCheese(3);
    await SoftBoard.addCheese(2);
    await BlockBoard.addCheese(4);

    //EagarLoading Board with its Cheeses
    const firstCheeseBoard = await Board.findByPk(1, {
      include: { model: Cheese },
    });
    const secondCheeseBoard = await Board.findByPk(2, {
      include: { model: Cheese },
    });
    const thirdCheeseBoard = await Board.findByPk(3, {
      include: { model: Cheese },
    });

    //tests
    expect(
      firstCheeseBoard.Cheeses[0].title === "Camembert" &&
        firstCheeseBoard.Cheeses[1].title === "Brie"
    ).toBeTruthy();

    expect(secondCheeseBoard.Cheeses[0].title).toEqual("ricotta");
    expect(thirdCheeseBoard.Cheeses[0].title).toEqual("Chedder Cheese");
  });
});
