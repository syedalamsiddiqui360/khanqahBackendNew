const person = require("../../database/models/person");
const { QueryTypes } = require('sequelize');
const db = require("../../database/connection");


exports.post = async (req, res, next) => {
  try {
   await person.create(req.body);
   res.send("Insert Successfully")
  } catch (e) {
    res.statusCode = 300;
    console.log(e);
    res.send({ "message": e.message });
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const {offset , limit} = req.body;
    const data = await person.findAndCountAll({
      offset: offset,
      limit: limit, 
      where: { deletedAt: null } });
    res.send(data)
  } catch (e) {
    res.statusCode = 300;
    console.log(e);
    res.send({ "message": e.message });
  }
};

exports.getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await person.findOne({where: {id : id , deletedAt : null}});
    res.send(data)
  } catch (e) {
    res.statusCode = 300;
    console.log(e);
    res.send({ "message": e.message });
  }
};

exports.update = async (req, res, next) => {
  try {
    const {id} = req.params;
    const result = await person.update( req.body ,{where: {id : id , deletedAt : null}});
    res.send(result == 1 ? true:false);
  } catch (e) {
    res.statusCode = 300;
    console.log(e);
    res.send({ "messagaae": e.message });
  }
};

exports.delete = async (req, res, next) => {
  try {
    const {id} = req.params;
    const result = await person.destroy({where: {id : id}});
    res.send(result == 1 ? true:false);
  } catch (e) {
    res.statusCode = 300;
    console.log(e);
    res.send({ "message": e.message });
  }
};

exports.getByType = async (req, res, next) => {
  try {
    const { typeId } = req.body;
    const data = await db.query("select p.title, p.id from person_type pt inner join types t on pt.type_id = t.id inner join person p on p.id = pt.person_id and  t.id =" + typeId, { type: QueryTypes.SELECT });

    res.send(data)
  } catch (e) {
    res.statusCode = 300;
    console.log(e);
    res.send({ "message": e.message });
  }
};