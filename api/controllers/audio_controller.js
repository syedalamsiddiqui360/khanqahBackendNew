const audio = require("../../database/models/audio");
const path = require('path');
const { body } = require("express-validator");
const { title } = require("process");



exports.post = async (req, res, next) => {
  var file = req.files.file
  var fileName = new Date() + file.name

  const data = {
    name: req.body.name,
    title: req.body.title,
    fileName: fileName,
    place: req.body.place,
    date: req.body.date,
    category_id: req.body.category,
    islamiDate: req.body.islamiDate,
    description: req.body.description,
  }
  console.log(req.files)
  console.log(req.body)
  try {

    if (file != null) {
      file.mv(__dirname + "/uploads/audio/" + fileName, async function (err) {
        if (err) {
          res.send(err);
        }
        else {
          const output = await audio.create(data)
          res.send("file uploaded");
        }
      })
    }
    else {
      res.statusCode = 300;
      res.send("Please Check log DataBase Error");
      console.log("file is null");
    }
  } catch (e) {
    res.statusCode = 300;
    res.send("Please Check log DataBase Error");
    console.log(e);
  }
};

exports.get = async (req, res, next) => {
  try {
    var { fileName } = req.params;

    var filePath = path.join(__dirname, "/uploads/audio/" + fileName);
    res.sendFile(filePath)
  } catch (e) {
    res.statusCode = 300;
    res.send("Please Check log DataBase Error");
    console.log(e);
  }
};

exports.download = async (req, res, next) => {
  try {
    var fileName = req.body.fileName
    var filePath = path.join(__dirname, "/uploads/audio/" + fileName);
    res.download(filePath);
  } catch (e) {
    res.statusCode = 300;
    res.send("Please Check log DataBase Error");
    console.log(e);
  }
};

exports.getAllAshar = async (req, res, next) => {
  let output = [];
  let count = 0;
  const { category_id, offset, limit } = req.body
  const data = {
    category_id:category_id,
    offset: offset,
    limit: limit
  }
  try {
    await audio.findAndCountAll({
      offset: data.offset,
      limit: data.limit
    })
      .then(function (result) {
        count = result.count;
        output = result.rows;
        // console.log(result.count);
        // console.log(result.rows);
      });

    // const data = await audio.findAll({ where: { deletedAt: null } })
    // const count = await audio.count({ where: { deletedAt: null } })
    res.send({ data: output, length: count })
  } catch (e) {
    res.statusCode = 300;
    res.send("Please Check log DataBase Error");
    console.log(e);
  }
};


exports.getByCategory = async (req, res, next) => {
  let output = [];
  let count = 0;
  const { category_id, offset, limit } = req.body
  const data = {
    category_id:category_id,
    offset: offset,
    limit: limit
  }
  try {
    await audio.findAndCountAll({
      offset: data.offset,
      limit: data.limit
    })
      .then(function (result) {
        count = result.count;
        output = result.rows;
        // console.log(result.count);
        // console.log(result.rows);
      });

    // const data = await audio.findAll({ where: { deletedAt: null } })
    // const count = await audio.count({ where: { deletedAt: null } })
    res.send({ data: output, length: count })
  } catch (e) {
    res.statusCode = 300;
    res.send("Please Check log DataBase Error");
    console.log(e);
  }
};

exports.getAllByPerson = async (req, res, next) => {
  try {
    const person = req.body.person
    console.log(person)

    const data = await audio.findAll({ where: { person: person, deletedAt: null } })

    res.send(data)
  } catch (e) {
    res.statusCode = 300;
    res.send("Please Check log DataBase Error");
    console.log(e);
  }
};

exports.getAllByCategory = async (req, res, next) => {
  try {
    const category = req.body.category
    console.log(category)

    const data = await audio.findAll({ where: { category: category, deletedAt: null } })

    res.send(data)
  } catch (e) {
    res.statusCode = 300;
    res.send("Please Check log DataBase Error");
    console.log(e);
  }
};

exports.getAllByPersonAndcategory = async (req, res, next) => {
  try {
    const person = req.body.person
    const category = req.body.category
    console.log(person)

    const data = await audio.findAll({ where: { person: person, category: category, deletedAt: null } })

    res.send(data)
  } catch (e) {
    res.statusCode = 300;
    res.send("Please Check log DataBase Error");
    console.log(e);
  }
};

exports.getAllByTypeAndPerson = async (req, res, next) => {
  try {
    const person = req.body.person
    const type = req.body.type
    console.log(person)

    const data = await audio.findAll({ where: { person: person, type: type, deletedAt: null } })

    res.send(data)
  } catch (e) {
    res.statusCode = 300;
    res.send("Please Check log DataBase Error");
    console.log(e);
  }
};

exports.getAllByTypeAndcategory = async (req, res, next) => {
  try {
    const type = req.body.type
    const category = req.body.category
    console.log(type)

    const data = await audio.findAll({ where: { type: type, category: category, deletedAt: null } })

    res.send(data)
  } catch (e) {
    res.statusCode = 300;
    res.send("Please Check log DataBase Error");
    console.log(e);
  }
};

exports.getAllByTypeAndPersonAndcategory = async (req, res, next) => {
  try {
    const person = req.body.person
    const category = req.body.category
    const type = req.body.type
    console.log(person)

    const data = await audio.findAll({ where: { type: type, person: person, category: category, deletedAt: null } })

    res.send(data)
  } catch (e) {
    res.statusCode = 300;
    res.send("Please Check log DataBase Error");
    console.log(e);
  }
};