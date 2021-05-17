const Sequelize = require("sequelize");
const db = require("../connection");

const table = db.define(
  "followers",
  {
    id: {
      type: Sequelize.BIGINT(11),
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING(255),
    },
    email: {
        type: Sequelize.STRING(70),
    },
    phoneNumber:{
       type: Sequelize.STRING(255)
    }
  },
  {
    paranoid: true,
    timestamps: true,
    // disable the modification of tablenames; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,
    // define the table's name
    tableName: "followers",
  }
);
module.exports = table;
