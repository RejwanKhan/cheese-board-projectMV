const { sequelize } = require("../src/connection");
const { Board } = require("../models/Board");
const { Users } = require("../models/User");

//Make a One to Many Relationship between Users and Boards
Users.hasMany(Board);
Board.belongsTo(Users);

beforeEach(async () => {
  await sequelize.sync({ force: true });

  //Bulk Creating The Users
  await Users.bulkCreate([
    { name: "Rejwan", email: "rejwankhanofficial@gmail.com" },
    { name: "Diogo", email: "Diogo@gmail.com" },
    { name: "John", email: "John@gmail.com" },
  ]);

  //Bulk Creating the Cheeses
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
      type: "Block of Cheeses Board",
      description: "A board full of various types of cheeses but in blocks ",
      rating: 2,
    },
  ]);
});

afterAll(async () => {
  await sequelize.sync({ force: true });
});

describe("testing One to Many association within a database", () => {
  it("testing One to Many association between Users and Boards", async () => {
    const firstUser = await Users.findByPk(1);
    const secondUser = await Users.findByPk(2);
    const thirdUser = await Users.findByPk(3);

    await firstUser.addBoard(2);
    await secondUser.addBoard(3);
    await thirdUser.addBoard(1);

    const firstBoard = await Board.findByPk(1);
    const secondBoard = await Board.findByPk(2);
    const thirdBoard = await Board.findByPk(3);

    console.log(JSON.stringify(firstBoard, null, 2));
    console.log(JSON.stringify(thirdBoard, null, 2));

    expect(
      firstBoard.type === "French Cheeses Board" && firstBoard.UserId === 3
    ).toBeTruthy();
    expect(
      secondBoard.type === "Soft Cheese Board" && secondBoard.UserId === 1
    ).toBeTruthy();
    expect(
      thirdBoard.type === "Block of Cheeses Board" && thirdBoard.UserId === 2
    ).toBeTruthy();
  });
});
