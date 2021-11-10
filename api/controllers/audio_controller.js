const audio = require("../../database/models/audio");
const Category = require("../../database/models/category");
const Type = require("../../database/models/type");
const Person = require("../../database/models/person");
const path = require('path');
const { QueryTypes } = require('sequelize');
const db = require("../../database/connection");
const { Op } = require("sequelize");

//Admin Api's
exports.post = async (req, res, next) => {
  try {
    var file = req.files.file
    const data = {
      name: req.body.name,
      title: req.body.title,
      fileName: fileName,
      place: req.body.place,
      date: req.body.date,
      categoryId: req.body.categoryId,
      personId: req.body.personId,
      islamiDate: req.body.islamiDate,
      description: req.body.description,
    }
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
          await audio.create(data)
          res.send("Insert Successfully");
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
      where: { deletedAt: null },
      include:[
        {
          model: Person,
          as: "person",
        },
        {
          model: Category,
          as: "category",
          include:{
            model: Type,
            as: "type"
          }
        }
      ]
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
    const data = await audio.findAll({
      where: { deletedAt: null },
      include:[
        {
          model: Person,
          as: "person",
        },
        {
          model: Category,
          as: "category",
          include:{
            model: Type,
            as: "type"
          }
        }
      ]
    });
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
    const data = await audio.findOne({
      where: {id : id , deletedAt : null},
      include:[
        {
          model: Person,
          as: "person",
        },
        {
          model: Category,
          as: "category",
          include:{
            model: Type,
            as: "type"
          }
        }
      ]
    });
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
      categoryId: req.body.categoryId,
      personId: req.body.personId,
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
    var filePath = path.join("uploads/" + fileName);
    res.sendFile(filePath, { root: './' });
  } catch (e) {
     res.statusCode = 300;
    console.log(e);
    res.send({ "message": e.message });
  }
};

exports.download = async (req, res, next) => {
  try {
    var fileName = req.body.fileName
    var filePath = path.join("uploads/" + fileName);
    res.download(filePath);
  } catch (e) {
     res.statusCode = 300;
    console.log(e);
    res.send({ "message": e.message });
  }
};


exports.getAllByTypeAndPerson = async (req, res, next) => {
  const { typeId, personId, offset, limit } = req.body;

  try {
    const data = await audio.findAndCountAll({
      offset: offset,
      limit: limit, 
      where:{personId: personId , deletedAt: null},
      include:[
        {
          model: Person,
          as: "person"
        },
        {
          model: Category,
          as: "category",
          where:{typeId: typeId},
          include:{
            model: Type,
            as: "type"
          }
        }
      ]
    })
    res.send({ data: data.rows, length: data.count })
  } catch (e) {
     res.statusCode = 300;
    console.log(e);
    res.send({ "message": e.message });
  }
};

exports.getAllByTypePersonCategory = async (req, res, next) => {
  const { typeId, categoryId, personId, offset, limit } = req.body;
  try {
    const data = await audio.findAndCountAll({
      offset: offset,
      limit: limit, 
      where:{personId: personId, categoryId: categoryId , deletedAt: null},
      include:[
        {
          model: Person,
          as: "person"
        },
        {
          model: Category,
          as: "category",
          where:{typeId: typeId},
          include:{
            model: Type,
            as: "type"
          }
        }
      ]
    })
    res.send({ data: data.rows, length: data.count })
  } catch (e) {
     res.statusCode = 300;
    console.log(e);
    res.send({ "message": e.message });
  }
};

exports.getAllByType = async (req, res, next) => {
  const { typeId, offset, limit } = req.body;

  try {
    const data = await audio.findAndCountAll({
      offset: offset,
      limit: limit, 
      where:{deletedAt: null},
      include:[
        {
          model: Person,
          as: "person"
        },
        {
          model: Category,
          as: "category",
          where:{typeId: typeId},
          include:{
            model: Type,
            as: "type"
          }
        }
      ]
    })
    res.send({ data: data.rows, length: data.count })
  } catch (e) {
     res.statusCode = 300;
    console.log(e);
    res.send({ "message": e.message });
  }
};

exports.getAllByCategory = async (req, res, next) => {
  const { categoryId, offset, limit } = req.body;

  try {
    const data = await audio.findAndCountAll({
      offset: offset,
      limit: limit, 
      where:{categoryId: categoryId , deletedAt: null},
      include:[
        {
          model: Person,
          as: "person"
        },
        {
          model: Category,
          as: "category",
          include:{
            model: Type,
            as: "type"
          }
        }
      ]
    })
    res.send({ data: data.rows, length: data.count })
  } catch (e) {
     res.statusCode = 300;
    console.log(e);
    res.send({ "message": e.message });
  }
};

exports.getAllBySearch = async (req, res, next) => {
  const { search, offset, limit } = req.body;

  try {
    const data = await audio.findAndCountAll({
      offset: offset,
      limit: limit, 
      where:{
        [Op.or]:[
          {title: {
          [Op.substring]: search
          }},
          {date: {
            [Op.substring]: search
          }},
          {description: {
            [Op.substring]: search
          }}
        ],
          deletedAt: null
        },
      include:[
        {
          model: Person,
          as: "person"
        },
        {
          model: Category,
          as: "category",
          include:{
            model: Type,
            as: "type"
          }
        }
      ]
    })
    res.send({ data: data.rows, length: data.count })
  } catch (e) {
     res.statusCode = 300;
    console.log(e);
    res.send({ "message": e.message });
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
    console.log(e);
    res.send({ "message": e.message });
  }
};
