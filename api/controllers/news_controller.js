const News = require("../../database/models/news");

exports.post = async (req, res, next) => {
  try {
   await News.create(req.body);
   res.send("Insert Successfully")
  } catch (e) {
    res.statusCode = 300;
    console.log(e);
    res.send({ "message": e.message });
  }
};

exports.getByLimit = async (req, res, next) => {
  try {
    const {offset , limit} = req.body;
    const data = await News.findAndCountAll({
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
      const data = await News.findAll({
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
    const data = await News.findOne({where: {id : id , deletedAt : null}});
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
    const result = await News.update( req.body ,{where: {id : id , deletedAt : null}});
    res.send(result == 1 ? true:false);
  } catch (e) {
    res.statusCode = 300;
    console.log(e);
    res.send({ "messagaae": e.message });
  }
};

exports.delete = async (req, res, next) => {
  try {
    const {id} = req.params;
    const result = await News.destroy({where: {id : id}});
    res.send(result == 1 ? true:false);
  } catch (e) {
    res.statusCode = 300;
    console.log(e);
    res.send({ "message": e.message });
  }
};

// User Api's
exports.getLatestNews = async (req, res, next) => {
  try {
    const data = await News.findAll({
        order: [ [ 'createdAt', 'DESC' ]],
        where:{ deletedAt: null , expire: false},
        limit: 1
      })
    res.send(data);
  } catch (e) {
    res.statusCode = 300;
    res.send({ "message": e.message });
    console.log(e);
  }
};

exports.getNews = async (req, res, next) => {
  try {
    const data = await News.findAll({
        order: [ [ 'createdAt', 'DESC' ]],  
        where:{ deletedAt: null , expireDate: false},
        limit: 3
      })
    res.send(data);
  } catch (e) {
    res.statusCode = 300;
    res.send({ "message": e.message });
    console.log(e);
  }
};