const category = require("../../database/models/category");
const { QueryTypes } = require('sequelize');
const db = require("../../database/connection");
const Type = require("../../database/models/type");

exports.post = async (req, res, next) => {
  try {
   await category.create(req.body);
   res.send("Insert Successfully")
  } catch (e) {
    res.statusCode = 300;
    console.log(e);
    res.send({ "message": e.message });
  }
};

exports.getByLimit = async (req, res, next) => {
  try {
    const {offset , limit} = req.body;
    const data = await category.findAndCountAll({
      offset: offset,
      limit: limit, 
      where: { deletedAt: null },
      include:{
        model: Type,
        as: "type"
      }
    });
    res.send(data)
  } catch (e) {
    res.statusCode = 300;
    console.log(e);
    res.send({ "message": e.message });
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const data = await category.findAll({
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
    const data = await category.findOne({where: {id : id , deletedAt : null}});
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
    const result = await category.update( req.body ,{where: {id : id , deletedAt : null}});
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
    const result = await category.destroy({where: {id : id}});
    res.send(result == 1 ? true:false);
  } catch (e) {
    res.statusCode = 300;
    console.log(e);
    res.send({ "message": e.message });
  }
};

exports.getByType = async (req, res, next) => {
  const { typeId } = req.body;
  try {
    // const data = await db.query("select c.title, c.id from category c inner join category_person_type cpt on c.id = cpt.category_id inner join person_type pt on cpt.person_type_id = pt.id inner join types t on pt.type_id = t.id and t.deletedAt is null and t.id = " + typeId + " GROUP BY c.id", { type: QueryTypes.SELECT });
    const categoryIds = await typeId.findAll({
      where: {id: typeId , deletedAt: null},
      attributes: ['categoryId']
    });
    
    const data = await category.findAll({
      where: { id: categoryIds //[1,2,3] 
        , deletedAt: null}
    });
    res.send(data)
  } catch (e) {
    res.statusCode = 300;
    console.log(e);
    res.send({ "message": e.message });
  }
};
