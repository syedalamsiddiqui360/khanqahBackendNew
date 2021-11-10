const pdf = require("../../database/models/pdf");
const path = require('path');
const { QueryTypes } = require('sequelize');
const db = require("../../database/connection");


//admin api's
exports.post = async (req, res, next) => {
  var imageFile = req.files.imageFile
  var pdfFile = req.files.pdfFile


  const data = {
    name: req.body.name,
    title: req.body.title,
    fileName: fileName,
    imageName: imageName,
    category_person_type_id: req.body.category,
    islamiDate: req.body.islamiDate,
    description: req.body.description,
  }

  try {
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
    const data = await pdf.findAll({
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
    const data = await pdf.findOne({where: {id : id , deletedAt : null}});
    res.send(data)
  } catch (e) {
    res.statusCode = 300;
    console.log(e);
    res.send({ "message": e.message });
  }
};

exports.update = async (req, res, next) => {
  
  const {id} = req.params;
  const data = {
    name: req.body.name,
    title: req.body.title,
    fileName: fileName,
    imageName: imageName,
    category_person_type_id: req.body.category,
    islamiDate: req.body.islamiDate,
    description: req.body.description,
  }
  
  try {
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
    const data = await db.query("select a.id, a.name,a.description,a.islamiDate,a.fileName,a.imageName,a.createdAt,a.updatedAt, a.category_person_type_id, a.title from pdf a inner join category_person_type ctp on a.category_person_type_id = ctp.id inner join person_type pt on ctp.person_type_id = pt.id inner join types t on pt.type_id = t.id inner join person p on p.id = pt.person_id and p.id = " + personId + " and p.deletedAt is null and t.deletedAt is null and t.id = " + typeId + " limit " + offset + " , " + limit, { type: QueryTypes.SELECT });
    const count = await db.query("select count(a.id) as count from pdf a inner join category_person_type ctp on a.category_person_type_id = ctp.id inner join person_type pt on ctp.person_type_id = pt.id inner join types t on pt.type_id = t.id inner join person p on p.id = pt.person_id and p.id = " + personId + " and p.deletedAt is null and t.deletedAt is null and t.id = " + typeId, { type: QueryTypes.SELECT });

    res.send({ data: data, length: count[0].count })
  } catch (e) {
    res.statusCode = 300;
    res.send({ "message": e.message });
    console.log(e);
  }
};

exports.getAllByTypePersonCategory = async (req, res, next) => {
  const { typeId, categoryId, personId, offset, limit } = req.body;
  console.log(req.body)
  try {
    const data = await db.query("select a.id, a.name,a.description,a.islamiDate,a.fileName,a.imageName,a.createdAt,a.updatedAt, a.category_person_type_id, a.title from pdf a inner join category_person_type ctp on a.category_person_type_id = ctp.id inner join category c on ctp.category_id = c.id and c.id = " + categoryId + " and c.deletedAt is null inner join person_type pt on ctp.person_type_id = pt.id inner join types t on pt.type_id = t.id inner join person p on p.id = pt.person_id and p.id = " + personId + " and p.deletedAt is null and t.deletedAt is null and t.id = " + typeId + " limit " + offset + " , " + limit, { type: QueryTypes.SELECT });
    const count = await db.query("select count(a.id) as count from pdf a inner join category_person_type ctp on a.category_person_type_id = ctp.id inner join category c on ctp.category_id = c.id and c.id = " + categoryId + " and c.deletedAt is null inner join person_type pt on ctp.person_type_id = pt.id inner join types t on pt.type_id = t.id inner join person p on p.id = pt.person_id and p.id = " + personId + " and p.deletedAt is null and t.deletedAt is null and t.id = " + typeId, { type: QueryTypes.SELECT });

    res.send({ data: data, length: count[0].count })
  } catch (e) {
    res.statusCode = 300;
    res.send({ "message": e.message });
    console.log(e);
  }
};

exports.getAllByType = async (req, res, next) => {
  const { typeId, offset, limit } = req.body;

  try {
    const data = await db.query("select a.id, a.name,a.description,a.islamiDate,a.fileName,a.imageName,a.createdAt,a.updatedAt, a.category_person_type_id, a.title from pdf a inner join category_person_type ctp on a.category_person_type_id = ctp.id inner join person_type pt on ctp.person_type_id = pt.id inner join types t on pt.type_id = t.id and t.deletedAt is null and t.id =" + typeId + " limit " + offset + " , " + limit, { type: QueryTypes.SELECT });
    const count = await db.query("select count(a.id) as count from pdf a inner join category_person_type ctp on a.category_person_type_id = ctp.id inner join person_type pt on ctp.person_type_id = pt.id inner join types t on pt.type_id = t.id and t.deletedAt is null and t.id =" + typeId, { type: QueryTypes.SELECT });

    res.send({ data: data, length: count[0].count })
  } catch (e) {
    res.statusCode = 300;
    res.send({ "message": e.message });
    console.log(e);
  }
};

exports.getAllByCategory = async (req, res, next) => {
  const { categoryId, offset, limit } = req.body;

  try {
    const data = await db.query("select a.id, a.name,a.description,a.islamiDate,a.fileName,a.imageName,a.createdAt,a.updatedAt, a.category_person_type_id, a.title from pdf a inner join category_person_type ctp on a.category_person_type_id = ctp.id inner join category c on ctp.category_id = c.id and c.id = " + categoryId + " and c.deletedAt is null limit " + offset + " , " + limit, { type: QueryTypes.SELECT });
    const count = await db.query("select count(a.id) as count from pdf a inner join category_person_type ctp on a.category_person_type_id = ctp.id inner join category c on ctp.category_id = c.id and c.id = " + categoryId + " and c.deletedAt is null", { type: QueryTypes.SELECT });

    res.send({ data: data, length: count[0].count })
  } catch (e) {
    res.statusCode = 300;
    res.send({ "message": e.message });

    console.log(e);
  }
};

exports.getAllBySearch = async (req, res, next) => {
  const { search, offset, limit } = req.body;

  try {
    const data = await db.query("select a.id, a.name,a.description,a.islamiDate,a.fileName,a.imageName,a.createdAt,a.updatedAt, a.category_person_type_id, a.title from pdf a where a.title like '%" + search + "%' OR a.description like '%" + search + "%' limit " + offset + " , " + limit, { type: QueryTypes.SELECT });
    const count = await db.query("select count(a.id) as count from pdf a where a.title like '%" + search + "%' OR a.description like '%" + search + "%'", { type: QueryTypes.SELECT });

    res.send({ data: data, length: count[0].count })
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
    const data = await db.query("select a.id, a.fileName, a.imageName from pdf a inner join category_person_type ctp on a.category_person_type_id = ctp.id inner join person_type pt on ctp.person_type_id = pt.id inner join types t on pt.type_id = t.id and t.deletedAt is null and ctp.deletedAt is null and a.deletedAt is null and t.id = " + typeId + " and ctp.category_id = " + categoryId + " order by a.createdAt DESC limit " + limit, { type: QueryTypes.SELECT });

    res.send(data)
  } catch (e) {
    res.statusCode = 300;
    console.log(e);
    res.send({ "message": e.message });
  }
};