const pdf = require("../../database/models/pdf");
const path = require('path');
const { QueryTypes } = require('sequelize');
const db = require("../../database/connection");
const Category = require("../../database/models/category");
const Type = require("../../database/models/type");
const Person = require("../../database/models/person");
const { Op } = require("sequelize");

//admin api's
exports.post = async (req, res, next) => {
  
  try {
    var imageFile = req.files.imageFile
    var pdfFile = req.files.pdfFile
    
    const data = {
      name: req.body.name,
      title: req.body.title,
      fileName: fileName,
      imageName: imageName,
      personId: req.body.personId,
      categoryId: req.body.categoryId,
      islamiDate: req.body.islamiDate,
      description: req.body.description,
    }

    var d = new Date();
    var numbar = Math.random();

    var filePath = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + " " + numbar + " " + pdfFile.name;
    var fileName = path.join('uploads/' + filePath);

    var imagePath = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + " " + numbar + " " + imageFile.name;
    var imageName = path.join('uploads/' + imagePath);

    data.fileName = filePath;
    data.imageName = imagePath;

    if (imageFile != null) {
      imageFile.mv(imageName, function (e) {
        if (e) {
          res.statusCode = 300;
          console.log(e);
          res.send({ "message": e.message });
        }
      })
      if (pdfFile != null) {
        pdfFile.mv(fileName, async function (e) {
          if (e) {
            res.statusCode = 300;
            console.log(e);
            res.send({ "message": e.message });
          }
          else {
            const output = await pdf.create(data)
            res.send("Insert Successfully");
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
    const data = await pdf.findAndCountAll({
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
    const data = await pdf.findAll({
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
    const data = await pdf.findOne({
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
  
  const {id} = req.params;
  try {
    const data = {
      name: req.body.name,
      title: req.body.title,
      fileName: fileName,
      imageName: imageName,
      personId: req.body.personId,
      categoryId: req.body.categoryId,
      islamiDate: req.body.islamiDate,
      description: req.body.description,
    }
  
    var d = new Date();
    var numbar = Math.random();
    
    const record = await pdf.findOne({where: {id : id , deletedAt : null}});
    if (req.files != null) {
      
      var imageFile = req.files.imageFile
      var pdfFile = req.files.pdfFile

      var filePath = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + " " + numbar + " " + pdfFile.name;
      var fileName = path.join('uploads/' + filePath);
      
      var imagePath = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + " " + numbar + " " + imageFile.name;
      var imageName = path.join('uploads/' + imagePath);
      data.imageName = imagePath;
      
      imageFile.mv(imageName, function (e) {
        if (e) {
          res.statusCode = 300;
          console.log(e);
          res.send({ "message": e.message });
        }
      })
      if (pdfFile != null) {
        data.fileName = filePath;
        pdfFile.mv(fileName, async function (e) {
          if (e) {
            res.statusCode = 300;
            console.log(e);
            res.send({ "message": e.message });
          }
          else {
            const result = await pdf.update( data ,{where: {id : id , deletedAt : null}});
            res.send(result == 1 ? true:false);
          }
        })
      }
      else{
        data.fileName = record.fileName;
        const result = await pdf.update( data ,{where: {id : id , deletedAt : null}});
        res.send(result == 1 ? true:false);        
      }
    }
    else {
      data.imageName = record.imageName;
      data.fileName = record.fileName;
      const result = await pdf.update( data ,{where: {id : id , deletedAt : null}});
      res.send(result == 1 ? true:false);        
    }
  } catch (e) {
    res.statusCode = 300;
    console.log(e);
    res.send({ "message": e.message });
  }
};

exports.delete = async (req, res, next) => {
  try {
    const {id} = req.params;
    const result = await pdf.destroy({where: {id : id}});
    res.send(result == 1 ? true:false);
  } catch (e) {
    res.statusCode = 300;
    console.log(e);
    res.send({ "message": e.message });
  }
};

//user Api's
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

exports.download = async (req, res, next) => {
  try {
    var fileName = req.params.fileName
    var filePath = path.join("uploads/" + fileName);
    res.download(filePath);
  } catch (e) {
    res.statusCode = 300;
    res.send({ "message": e.message });
    console.log(e);
  }
};


exports.getAllByTypeAndPerson = async (req, res, next) => {
  const { typeId, personId, offset, limit } = req.body;

  try {
    const data = await pdf.findAndCountAll({
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
    res.send({ "message": e.message });
    console.log(e);
  }
};

exports.getAllByTypePersonCategory = async (req, res, next) => {
  const { typeId, categoryId, personId, offset, limit } = req.body;

  try {
    const data = await pdf.findAndCountAll({
      offset: offset,
      limit: limit, 
      where:{personId: personId, categoryId: categoryId, deletedAt: null},
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
    res.send({ "message": e.message });
    console.log(e);
  }
};

exports.getAllByType = async (req, res, next) => {
  const { typeId, offset, limit } = req.body;

  try {
    const data = await pdf.findAndCountAll({
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
    res.send({ "message": e.message });
    console.log(e);
  }
};

exports.getAllByCategory = async (req, res, next) => {
  const { categoryId, offset, limit } = req.body;

  try {
    const data = await pdf.findAndCountAll({
      offset: offset,
      limit: limit, 
      where:{categoryId: categoryId, deletedAt: null},
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
    res.send({ "message": e.message });

    console.log(e);
  }
};

exports.getAllBySearch = async (req, res, next) => {
  const { search, offset, limit } = req.body;

  try {
    const data = await pdf.findAndCountAll({
      offset: offset,
      limit: limit, 
      where:{
        [Op.or]:[
          {title: {
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
  const { typeId, limit, categoryId, order } = req.body;

  try {
    const data = await pdf.findAll({
      limit: limit, 
      attributes: ['id', 'fileName', 'imageName'],
      where:{categoryId:categoryId, deletedAt: null},
      order: [
        ['createdAt', 'DESC']
      ],
      include:[
        {
          model: Category,
          as: "category",
          attributes: ['id', 'typeId'],
          where:{typeId: typeId}
        }
      ]
    })
    res.send(data)    
  } catch (e) {
    res.statusCode = 300;
    console.log(e);
    res.send({ "message": e.message });
  }
};