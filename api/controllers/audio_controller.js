const audio = require("../../database/models/audio");
const path = require('path');
const { QueryTypes } = require('sequelize');
const db = require("../../database/connection");


//Admin Api's
exports.post = async (req, res, next) => {
  var file = req.files.file

  const data = {
    name: req.body.name,
    title: req.body.title,
    fileName: fileName,
    place: req.body.place,
    date: req.body.date,
    category_id: req.body.category,
    type_id: req.body.type,
    person_id: req.body.person,
    islamiDate: req.body.islamiDate,
    description: req.body.description,
  }

  try {
    var d = new Date();
    var numbar = Math.random();
    var p = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + " " + numbar + " " + file.name;
    var fileName = path.join('uploads/' + p);
    data.fileName = p;
    if (file != null) {
      file.mv(fileName, async function (e) {
        if (e) {
          res.statusCode = 300;
          console.log(e);
          res.send({ "message": e.message });
        }
        else {
          // const output = await audio.create(data)
          res.send("file uploaded");
        }
      })
    }
    else {
      res.statusCode = 300;
      console.log("file is null");
      res.send({ "message": "file is null" });
    }
  } catch (e) {
    res.statusCode = 300;
    console.log(e);
    res.send({ "message": e.message });
  }
};

exports.getByLimit = async (req, res, next) => {
  try {
    const {offset , limit} = req.body;
    const data = await audio.findAndCountAll({
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

exports.getAll = async (req, res, next) => {
  try {
    const data = await audio.findAll({
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
    const data = await audio.findOne({where: {id : id , deletedAt : null}});
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
    
    const data = {
      name: req.body.name,
      title: req.body.title,
      fileName: fileName,
      place: req.body.place,
      date: req.body.date,
      category_id: req.body.category,
      type_id: req.body.type,
      person_id: req.body.person,
      islamiDate: req.body.islamiDate,
      description: req.body.description,
    }
    
    var d = new Date();
    var numbar = Math.random();
    
    if (req.files != null) {
      var file = req.files.file
      var p = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + " " + numbar + " " + file.name;
      var fileName = path.join('uploads/' + p);

      data.fileName = p;
      file.mv(fileName, async function (e) {
        if (e) {
          res.statusCode = 300;
          console.log(e);
          res.send({ "message": e.message });
        }
        else {
          const result = await audio.update( data ,{where: {id : id , deletedAt : null}});
          res.send(result == 1 ? true:false);
        }
      })
    }
    else {
      const record = await audio.findOne({where: {id : id , deletedAt : null}});
      data.fileName = record.fileName;
      const result = await audio.update( data ,{where: {id : id , deletedAt : null}});
      res.send(result == 1 ? true:false);
    }
  } catch (e) {
    res.statusCode = 300;
    console.log(e);
    res.send({ "messagaae": e.message });
  }
};

exports.delete = async (req, res, next) => {
  try {
    const {id} = req.params;
    const result = await audio.destroy({where: {id : id}});
    res.send(result == 1 ? true:false);
  } catch (e) {
    res.statusCode = 300;
    console.log(e);
    res.send({ "message": e.message });
  }
};

//User Api's
exports.getFile = async (req, res, next) => {
  try {
    var { fileName } = req.params;
    console.log("fileName")
    var filePath = path.join("uploads/" + fileName);
    res.sendFile(filePath, { root: './' });
  } catch (e) {
    res.statusCode = 300;
    res.send("Please Check log DataBase Error");
    console.log(e);
  }
};

exports.download = async (req, res, next) => {
  try {
    var fileName = req.body.fileName
    var filePath = path.join("uploads/" + fileName);
    res.download(filePath);
  } catch (e) {
    res.statusCode = 300;
    res.send("Please Check log DataBase Error");
    console.log(e);
  }
};


exports.getAllByTypeAndPerson = async (req, res, next) => {
  const { typeId, personId, offset, limit } = req.body;

  try {
    const data = await db.query("select a.id, a.name,a.description,a.date,a.place,a.islamiDate,a.fileName,a.createdAt,a.updatedAt, a.category_person_type_id, a.title from audio a inner join category_person_type ctp on a.category_person_type_id = ctp.id inner join person_type pt on ctp.person_type_id = pt.id inner join types t on pt.type_id = t.id inner join person p on p.id = pt.person_id and p.id = " + personId + " and p.deletedAt is null and t.deletedAt is null and t.id = " + typeId + " limit " + offset + " , " + limit, { type: QueryTypes.SELECT });
    const count = await db.query("select count(a.id) as count from audio a inner join category_person_type ctp on a.category_person_type_id = ctp.id inner join person_type pt on ctp.person_type_id = pt.id inner join types t on pt.type_id = t.id inner join person p on p.id = pt.person_id and p.id = " + personId + " and p.deletedAt is null and t.deletedAt is null and t.id = " + typeId, { type: QueryTypes.SELECT });

    res.send({ data: data, length: count[0].count })
  } catch (e) {
    res.statusCode = 300;
    res.send("Please Check log DataBase Error");
    console.log(e);
  }
};

exports.getAllByTypePersonCategory = async (req, res, next) => {
  const { typeId, categoryId, personId, offset, limit } = req.body;
  console.log(req.body)
  try {
    const data = await db.query("select a.id, a.name,a.description,a.date,a.place,a.islamiDate,a.fileName,a.createdAt,a.updatedAt, a.category_person_type_id, a.title from audio a inner join category_person_type ctp on a.category_person_type_id = ctp.id inner join category c on ctp.category_id = c.id and c.id = " + categoryId + " and c.deletedAt is null inner join person_type pt on ctp.person_type_id = pt.id inner join types t on pt.type_id = t.id inner join person p on p.id = pt.person_id and p.id = " + personId + " and p.deletedAt is null and t.deletedAt is null and t.id = " + typeId + " limit " + offset + " , " + limit, { type: QueryTypes.SELECT });
    const count = await db.query("select count(a.id) as count from audio a inner join category_person_type ctp on a.category_person_type_id = ctp.id inner join category c on ctp.category_id = c.id and c.id = " + categoryId + " and c.deletedAt is null inner join person_type pt on ctp.person_type_id = pt.id inner join types t on pt.type_id = t.id inner join person p on p.id = pt.person_id and p.id = " + personId + " and p.deletedAt is null and t.deletedAt is null and t.id = " + typeId, { type: QueryTypes.SELECT });

    res.send({ data: data, length: count[0].count })
  } catch (e) {
    res.statusCode = 300;
    res.send("Please Check log DataBase Error");
    console.log(e);
  }
};

exports.getAllByType = async (req, res, next) => {
  const { typeId, offset, limit } = req.body;

  try {
    const data = await db.query("select a.id, a.name,a.description,a.date,a.place,a.islamiDate,a.fileName,a.createdAt,a.updatedAt, a.category_person_type_id, a.title from audio a inner join category_person_type ctp on a.category_person_type_id = ctp.id inner join person_type pt on ctp.person_type_id = pt.id inner join types t on pt.type_id = t.id and t.deletedAt is null and t.id =" + typeId + " limit " + offset + " , " + limit, { type: QueryTypes.SELECT });
    const count = await db.query("select count(a.id) as count from audio a inner join category_person_type ctp on a.category_person_type_id = ctp.id inner join person_type pt on ctp.person_type_id = pt.id inner join types t on pt.type_id = t.id and t.deletedAt is null and t.id =" + typeId, { type: QueryTypes.SELECT });

    res.send({ data: data, length: count[0].count })
  } catch (e) {
    res.statusCode = 300;
    res.send("Please Check log DataBase Error");
    console.log(e);
  }
};

exports.getAllByCategory = async (req, res, next) => {
  const { categoryId, offset, limit } = req.body;

  try {
    const data = await db.query("select a.id, a.name,a.description,a.date,a.place,a.islamiDate,a.fileName,a.createdAt,a.updatedAt, a.category_person_type_id, a.title from audio a inner join category_person_type ctp on a.category_person_type_id = ctp.id inner join category c on ctp.category_id = c.id and c.id = " + categoryId + " and c.deletedAt is null limit " + offset + " , " + limit, { type: QueryTypes.SELECT });
    const count = await db.query("select count(a.id) as count from audio a inner join category_person_type ctp on a.category_person_type_id = ctp.id inner join category c on ctp.category_id = c.id and c.id = " + categoryId + " and c.deletedAt is null", { type: QueryTypes.SELECT });

    res.send({ data: data, length: count[0].count })
  } catch (e) {
    res.statusCode = 300;
    res.send("Please Check log DataBase Error");
    console.log(e);
  }
};

exports.getAllBySearch = async (req, res, next) => {
  const { search, offset, limit } = req.body;

  try {
    const data = await db.query("select a.id, a.name,a.description,a.date,a.place,a.islamiDate,a.fileName,a.createdAt,a.updatedAt, a.category_person_type_id, a.title from audio a where a.title like '%"+search+"%' OR a.date like '%"+search+"%' OR a.description like '%"+search+"%' limit " + offset + " , " + limit, { type: QueryTypes.SELECT });
    const count = await db.query("select count(a.id) as count from audio a where a.title like '%"+search+"%' OR a.date like '%"+search+"%' OR a.description like '%"+search+"%'", { type: QueryTypes.SELECT });

    res.send({ data: data, length: count[0].count })
  } catch (e) {
    res.statusCode = 300;
    res.send("Please Check log DataBase Error");
    console.log(e);
  }
};

//home page api
exports.getByType = async (req, res, next) => {
  const { typeId, limit , order } = req.body;

  try {
    const data = await db.query("select a.id, a.fileName from audio a inner join category_person_type ctp on a.category_person_type_id = ctp.id inner join person_type pt on ctp.person_type_id = pt.id inner join types t on pt.type_id = t.id and t.deletedAt is null and a.deletedAt is null and ctp.deletedAt is null and t.id = "+typeId+" order by date DESC limit "+limit, { type: QueryTypes.SELECT });

    res.send(data)
  } catch (e) {
    res.statusCode = 300;
    res.send("Please Check log DataBase Error");
    console.log(e);
  }
};
