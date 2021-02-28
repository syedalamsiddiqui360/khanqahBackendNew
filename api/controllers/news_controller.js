const news = require("../../database/models/news");
const Sequelize = require("sequelize");


exports.getLatestNews = async (req, res, next) => {
  try {
    const data = await news.findAll({
        order: [ [ 'createdAt', 'DESC' ]],
        where:{ deletedAt: null , expireDate: null},
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
    const data = await news.findAll({
        order: [ [ 'createdAt', 'DESC' ]],  
        where:{ deletedAt: null , expireDate: null},
        limit: 3
      })
    res.send(data);
  } catch (e) {
    res.statusCode = 300;
    res.send({ "message": e.message });
    console.log(e);
  }
};