const category = require("../../database/models/category");
const { QueryTypes } = require('sequelize');
const db = require("../../database/connection");



exports.post = async (req, res, next) => {
  // var file = req.files.file
  // var fileName = new Date() + file.name

  // const data={
  //   name: req.body.name,
  //   title:req.body.title,
  //   type: req.body.type,
  //   fileName: req.body.fileName,
  //   place: req.body.place,
  //   date:req.body.date,
  //   category: req.body.category,
  //   person: req.body.person,
  //   islamiDate: req.body.islamiDate,
  //   description: req.body.description
  // }
  // console.log(req.files)
  // console.log(req.body)
  // try {

  //   if (file != null) {
  //     file.mv(__dirname + "/uploads/audio/" + fileName, async function (err) {
  //       if (err) {
  //         res.send(err);
  //       }
  //       else {
  //         const output = await audio.create(data)           
  //         res.send("file uploaded");
  //       }
  //     })
  //   }
  //   else{
  //     res.statusCode = 300;
  //     res.send("Please Check log DataBase Error");
  //     console.log("file is null");
  //   }
  // } catch (e) {
  //   res.statusCode = 300;
  //   res.send("Please Check log DataBase Error");
  //   console.log(e);
  // }
};

exports.getByType = async (req, res, next) => {
  const { typeId } = req.body;
  try {
    const data = await db.query("select c.title, c.id from category c inner join category_person_type cpt on c.id = cpt.category_id inner join person_type pt on cpt.person_type_id = pt.id inner join types t on pt.type_id = t.id and t.deletedAt is null and t.id = " + typeId + " GROUP BY c.id", { type: QueryTypes.SELECT });
    res.send(data)
  } catch (e) {
    res.statusCode = 300;
    res.send("Please Check log DataBase Error");
    console.log(e);
  }
};

exports.get = async (req, res, next) => {
  try {
    const data = await category.findAll({ where: { deletedAt: null } });
    res.send(data)
  } catch (e) {
    res.statusCode = 300;
    res.send("Please Check log DataBase Error");
    console.log(e);
  }
};

exports.getByTypeAndPerson = async (req, res, next) => {
  const { typeId, personId } = req.body;
  try {
    const data = await db.query("select c.title, c.id from category c inner join person_type pt on c.person_type_id = pt.id inner join types t on pt.type_id = t.id inner join person p on p.id = pt.person_id and p.id = " + personId + " and p.deletedAt is null and t.deletedAt is null and t.id =" + typeId, { type: QueryTypes.SELECT });
    res.send(data)
  } catch (e) {
    res.statusCode = 300;
    res.send("Please Check log DataBase Error");
    console.log(e);
  }
};