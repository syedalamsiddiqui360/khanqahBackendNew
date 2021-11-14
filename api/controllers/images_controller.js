const images = require("../../database/models/images");
const path = require('path');

//admin api's
exports.post = async (req, res, next) => {
  try {
    var files = req.files.file
    var d = new Date();
    if (files != null) {
      console.log(typeof files)
      console.log(files.size)
      if (!files.size) {
      files.forEach(file => {
        var numbar = Math.random();
        var p = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + " " + numbar + " " + file.name;
        var fileName = path.join('uploads/' + p);
        const data = {
          title: req.body.title,
          imageName: p,
          sliderId: req.body.sliderId
        }
        file.mv(fileName, async function (e) {
          if (e) {
            res.statusCode = 300;
            console.log(e);
            res.send({ "message": e.message });
          }
          else {
            console.log(data);

            const output = await images.create(data)
            res.send("file uploaded");
          }
        })

      });
    }
    else{
      var numbar = Math.random();
      var p = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + " " + numbar + " " + files.name;
      var fileName = path.join('uploads/' + p);
      const data = {
        title: req.body.title,
        imageName: p,
        sliderId: req.body.sliderId
      }
      files.mv(fileName, async function (e) {
        if (e) {
          res.statusCode = 300;
          console.log(e);
          res.send({ "message": e.message });
        }
        else {
          console.log(data);

          const output = await images.create(data)
          res.send("file uploaded");
        }
      })
    }
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
    const data = await images.findAndCountAll({
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
    const data = await images.findAll({
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
    const data = await images.findOne({where: {id : id , deletedAt : null}});
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
      title: req.body.title,
      imageName: '',
      sliderId: req.body.sliderId
    }
    if (req.files != null) {
      var file = req.files.file
      var d = new Date();
      var numbar = Math.random();
      var p = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + " " + numbar + " " + file.name;
      var fileName = path.join('uploads/' + p);
      data.imageName = p;
      file.mv(fileName, async function (e) {
        if (e) {
          res.statusCode = 300;
          console.log(e);
          res.send({ "message": e.message });
        }
        else {
          const result = await images.update( data ,{where: {id : id , deletedAt : null}});
          res.send(result == 1 ? true:false);
        }
      })
    }
    else {
      const record = await images.findOne({where: {id : id , deletedAt : null}});
      data.imageName = record.imageName;
      const result = await images.update( data ,{where: {id : id , deletedAt : null}});
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
    const result = await images.destroy({where: {id : id}});
    res.send(result == 1 ? true:false);
  } catch (e) {
    res.statusCode = 300;
    console.log(e);
    res.send({ "message": e.message });
  }
};

//user api's
exports.get = async (req, res, next) => {
  try {
    var { fileName } = req.params;
    var filePath = path.join("uploads/" + fileName);
    res.sendFile(filePath, { root: './' });
  } catch (e) {
    res.statusCode = 300;
    res.send({ "message": e.message });
    console.log(e);
  }
};


exports.getBySliderId = async (req, res, next) => {
  const { sliderId, limit } = req.body;
  try {
    const data = await images.findAll({
      limit:limit,
      where:{slider_id:sliderId , deletedAt:null}
    })
    res.send(data)
  } catch (e) {
    res.statusCode = 300;
    res.send({ "message": e.message });
    console.log(e);
  }
};