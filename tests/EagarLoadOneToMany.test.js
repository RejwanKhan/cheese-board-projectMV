const { sequelize } = require("../src/connection");
const { Users } = require("../models/User");
const { Board } = require("../models/Board");

//Making the One to Many Relationship

Users.hasMany(Board);
Board.belongsTo(Users);

beforeEach(async () => {
  await sequelize.sync({ force: true });

  //Bulk Create Users
  await Users.bulkCreate([
    { name: "Rejwan", email: "rejwankhanofficial@gmail.com" },
    { name: "Diogo", email: "Diogo@gmail.com" },
    { name: "John", email: "John@gmail.com" },
  ]);

  //Bulk Create Cheeses
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
      type: "Block of Cheeses Board",
      description: "A board full of various types of cheeses but in blocks ",
      rating: 2,
    },
  ]);
});

afterEach(async () => {
  await sequelize.sync({ force: true });
});

describe("testing EagarLoading Between a One to Many relationship", () => {
  it("testing EagarLoading between Users and Boards", async () => {
    const firstUser = await Users.findByPk(1);
    const secondUser = await Users.findByPk(2);
    const thirdUser = await Users.findByPk(3);

    //Making association between Users and Boards

    await firstUser.addBoard(2);
    await secondUser.addBoard(3);
    await thirdUser.addBoard(1);

    const firstUserBoard = await Users.findByPk(1, {
      include: [{ model: Board }],
    });
    const secondUserBoard = await Users.findByPk(2, {
      include: [{ model: Board }],
    });
    const thirdUserBoard = await Users.findByPk(1, {
      include: [{ model: Board }],
    });

    //Tests

    expect((firstUserBoard.Boards[0].type = "Soft Cheese Board"));
    expect((secondUserBoard.Boards[0].type = "Block of Cheeses Board"));
    expect((thirdUserBoard.Boards[0].type = "French Cheeses Board"));
  });
});
