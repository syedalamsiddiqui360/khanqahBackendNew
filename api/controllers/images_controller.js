const images = require("../../database/models/images");
const path = require('path');
const fileSystem = require('fs')



exports.post = async (req, res, next) => {


  try {
    var files = req.files.file
    var d = new Date();
 

    if (files != null) {

      files.forEach(file => {
        var numbar = Math.random();
        var p = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + " " + numbar + " " + file.name;
        var fileName = path.join('uploads/' + p);

        const data = {
          title: file.name,
          imageName: p,
          slider_id: req.body.slider_id
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