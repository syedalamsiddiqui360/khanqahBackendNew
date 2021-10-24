const type = require("../../database/models/type");


exports.post = async (req, res, next) => {
  try {
   await type.create(req.body);
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
    const data = await type.findAndCountAll({
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
      const data = await type.findAll({
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
    const data = await type.findOne({where: {id : id , deletedAt : null}});
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
    const result = await type.update( req.body ,{where: {id : id , deletedAt : null}});
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
    const result = await type.destroy({where: {id : id}});
    res.send(result == 1 ? true:false);
  } catch (e) {
    res.statusCode = 300;
    console.log(e);
    res.send({ "message": e.message });
  }
};

