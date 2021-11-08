const Sequelize = require("sequelize");
const db = require("../connection");
const bcrypt = require("bcrypt");

const table = db.define(
  "images",
  {
    id: {
      type: Sequelize.BIGINT(11),
      autoIncrement: true,
      primaryKey: true,
    },
    sliderId: {
      type: Sequelize.BIGINT(11),
    },
    title: {
      type: Sequelize.STRING(255),
    },
    imageName: {
      type: Sequelize.STRING(255),
    },
  },
  {
    paranoid: true,
    timestamps: true,
    // disable the modification of tablenames; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,
    // define the table's name
    tableName: "images",
  }
);
module.exports = table;
