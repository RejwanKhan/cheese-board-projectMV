const { sequelize } = require("../src/connection");
const { Cheese } = require("../models/Cheese");
const { Board } = require("../models/Board");
const { ShowCase } = require("../models/ShowCase");
const { Users } = require("../models/User");
beforeEach(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.sync({ force: true });
});

describe("testing Properties of the models", () => {
  it("testing Board Properties are correct ", async () => {
    const newBoard = await Board.create({
      type: "Italian Board",
      description: "Fresh Cheese From Italy",
      rating: 4,
    });

    expect(newBoard.type).toEqual("Italian Board");
    expect(newBoard.description).toEqual("Fresh Cheese From Italy");
  });

  it("testing User properties are correct ", async () => {
    const newUser = await Users.create({
      name: "Rufus",
      email: "Rufus@gmail.com",
    });

    expect(newUser.name).toEqual("Rufus");
    expect(newUser.email).toEqual("Rufus@gmail.com");
  });

  it("Testing Cheese Properties are correct", async () => {
    const newCheese = await Cheese.create({
      title: "Parmesan",
      description: "Fresh Cheese From Italy, perfect for your Lasagna",
    });

    expect(newCheese.title).toEqual("Parmesan");
    expect(newCheese.description).toEqual(
      "Fresh Cheese From Italy, perfect for your Lasagna"
    );
  });
});
