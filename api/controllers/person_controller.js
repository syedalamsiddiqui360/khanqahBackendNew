const person = require("../../database/models/person");
const personType = require("../../database/models/person_type");
const { QueryTypes } = require('sequelize');
const db = require("../../database/connection");


exports.post = async (req, res, next) => {


  const data = {
    name: req.body.name,

  }

  try {


  } catch (e) {
    res.statusCode = 300;
    res.send("Please Check log DataBase Error");
    console.log(e);
  }
};

exports.get = async (req, res, next) => {

  try {

    const data = await person.findAll({ where: { deletedAt: null } });
    res.send(data)
  } catch (e) {
    res.statusCode = 300;
    res.send("Please Check log DataBase Error");
    console.log(e);
  }
};

exports.getByType = async (req, res, next) => {
  try {
    const { typeId } = req.body;
    const data = await db.query("select p.title, p.id from person_type pt inner join types t on pt.type_id = t.id inner join person p on p.id = pt.person_id and  t.id =" + typeId, { type: QueryTypes.SELECT });

    res.send(data)
  } catch (e) {
    res.statusCode = 300;
    res.send("Please Check log DataBase Error");
    console.log(e);
  }
};