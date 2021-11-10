const Sequelize = require("sequelize");
const db = require("../connection");
const Category = require('./category');
const Person = require('./person');

const pdf = db.define(
  "pdf",
  {
    id: {
      type: Sequelize.BIGINT(11),
      autoIncrement: true,
      primaryKey: true,
    },
    categoryId: {
      type: Sequelize.BIGINT(11),
    },
    personId: {
      type: Sequelize.BIGINT(11),
    },
    title: {
      type: Sequelize.STRING(255),
    },
    name: {
      type: Sequelize.STRING(255),
    },
    description: {
      type: Sequelize.STRING(500),
    },
    islamiDate: {
      type: Sequelize.STRING(255),
    },
    fileName: {
      type: Sequelize.STRING(500),
    },
    imageName: {
      type: Sequelize.STRING(500),
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
    tableName: "pdf",
  }
);
pdf.belongsTo(Category, {as: 'category'});
pdf.belongsTo(Person, {as: 'person'});
module.exports = pdf;
