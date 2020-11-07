const user = require("../../database/models/users");
// const user_type = require("../ ");
//const bcrypt = require("bcrypt");
//const jwt = require("jsonwebtoken");
//const { validationResult } = require("express-validator")
require("dotenv").config();
const path = require('path');
const fileSystem = require('fs')

//const readFile = util.promisify(fileSystem.readFile);



//get  all users from user model
exports.post = async (req, res, next) => {
  try {
    console.log(req.files)
    var file = req.files.file
    var fileName = file.name
    file.mv(__dirname + "/uploads/images/" + fileName, function (err) {
      if (err) {
        res.send(err);
      }
      else {
        res.send("upload files");
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
    var { fileName, folder } = req.params;
    console.log(fileName + " " + folder)
    var filePath = path.join(__dirname, "/uploads/audio/" + folder + "/" + fileName);
    res.sendFile(filePath)

  } catch (e) {
    res.statusCode = 300;
    res.send("Please Check log DataBase Error");
    console.log(e);
  }
};


exports.getAll = async (req, res, next) => {
  // console.log("here")
  let fileList = []
  try {
    var fileName = req.body.fileName
    //console.log(fileName)
    let list = [
      {
        name: "140516_002.MP3"
      },
      {
        name: "140603_001.MP3"
      },
      {
        name: "140516_002.MP3"
      }]

    var fileName = req.body.fileName
    console.log(fileName)
    for (let i = 0; i < list.length; i++) {
      filePath = path.join(__dirname, "/uploads/ashaar/" + list[i].name);
      fileList.push(filePath)
    }
    var stat = fileSystem.statSync(filePath);


    // fileSystem.readFile(filePath, function (err, content) {
    //   if (err) {
    //     console.log(err)
    //   } else {
    //     // res.writeHead(200, {
    //     //   'Content-Type': 'audio/mpeg',
    //     //   'Content-Length': stat.size
    //     // });
    //     res.end(content)
    //   }
    // });

    //res.sendFile(filePath)
    res.send({ fileList })

  } catch (e) {
    res.statusCode = 300;
    res.send("Please Check log DataBase Error");
    console.log(e);
  }
};

exports.download = async (req, res, next) => {
  // console.log("here")
  try {
    var fileName = req.body.fileName
    console.log(fileName)
    var join = __dirname + "/uploads/140516_002.MP3";
    var filePath = path.join(__dirname, "/uploads/ashaar/140516_002.MP3");
    var stat = fileSystem.statSync(filePath);



    // fileSystem.readFile(filePath, function (err, content) {

    //   if (err) {
    //     console.log(err)
    //   } else {
    //     res.writeHead(200, {
    //       'Content-Type': 'audio/mpeg',
    //       'Content-Length': stat.size
    //     });
    //     res.end(content)
    //   }
    // });

    // We replaced all the event handlers with a simple call to readStream.pipe()
    //    readStream.pipe(res);


    res.download(filePath);

  } catch (e) {
    res.statusCode = 300;
    res.send("Please Check log DataBase Error");
    console.log(e);
  }
};

