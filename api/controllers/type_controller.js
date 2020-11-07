const type = require("../../database/models/type");



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

exports.get = async (req, res, next) => {
  try {
    const data = await type.findAll({ where: {  deletedAt: null } });
    res.send(data)
  } catch (e) {
    res.statusCode = 300;
    res.send("Please Check log DataBase Error");
    console.log(e);
  }
};

exports.getById = async (req, res, next) => {
  const id = req.body.id
  try {
    const data = await type.findAll({ where: { id: id, deletedAt: null } });
    res.send(data)
  } catch (e) {
    res.statusCode = 300;
    res.send("Please Check log DataBase Error");
    console.log(e);
  }
};