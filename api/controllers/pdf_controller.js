const pdf = require("../../database/models/pdf");
const path = require('path');



exports.post = async (req, res, next) => {
  try {
    var file = req.files.file
    var fileName = new Date() + file.name

    file.mv(__dirname + "/uploads/pdf/" + fileName, function (err) {
      if (err) {
        res.send(err);
      }
      else {
        res.send("file uploaded");
      }
    })
  } catch (e) {
    res.statusCode = 300;
    res.send("Please Check log DataBase Error");
    console.log(e);
  }
};

exports.get = async (req, res, next) => {
  try {
    var { fileName } = req.params;

    var filePath = path.join(__dirname, "/uploads/pdf/" + fileName);
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
    var filePath = path.join(__dirname, "/uploads/pdf/" + fileName);
    res.download(filePath);
  } catch (e) {
    res.statusCode = 300;
    res.send("Please Check log DataBase Error");
    console.log(e);
  }
};

exports.getAllByType = async (req, res, next) => {
  try {
    const type = req.body.type
    console.log(type)

    const data = await pdf.findAll({ where: { type: type, deletedAt: null } })

    res.send(data)
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

    const data = await pdf.findAll({ where: { person: person, deletedAt: null } })

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

    const data = await pdf.findAll({ where: { category: category, deletedAt: null } })

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

    const data = await pdf.findAll({ where: { person: person, category: category, deletedAt: null } })

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

    const data = await pdf.findAll({ where: { person: person, type: type, deletedAt: null } })

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

    const data = await pdf.findAll({ where: { type: type, category: category, deletedAt: null } })

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

    const data = await pdf.findAll({ where: { type: type, person: person, category: category, deletedAt: null } })

    res.send(data)
  } catch (e) {
    res.statusCode = 300;
    res.send("Please Check log DataBase Error");
    console.log(e);
  }
};