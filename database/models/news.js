const Sequelize = require("sequelize");
const db = require("../connection");

const table = db.define(
  "news",
  {
    id: {
      type: Sequelize.BIGINT(11),
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING(255),
    },
    description: {
        type: Sequelize.STRING(500),
    },
    expireDate:{
       type: Sequelize.DATE
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
    tableName: "news",
  }
);
module.exports = table;
