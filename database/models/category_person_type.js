const Sequelize = require("sequelize");
const db = require("../connection");

const table = db.define(
    "category_person_type",
    {
        id: {
            type: Sequelize.BIGINT(11),
            autoIncrement: true,
            primaryKey: true,
        },
        category_id: {
            type: Sequelize.BIGINT(11),
            references: {
                model: "category", //  refers to table name
                key: "id", //  refers to column name in reference table
            },
        },
        person_type_id: {
            type: Sequelize.BIGINT(11),
            references: {
                model: "person_type", //  refers to table name
                key: "id", //  refers to column name in reference table
            },
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
        tableName: "category_person_type",
    }
);
module.exports = table;
