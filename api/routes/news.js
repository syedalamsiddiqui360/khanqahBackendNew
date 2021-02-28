const express = require("express");
const router = express.Router();


const checkAuth = require("../middleware/check-auth");
const newsController = require("../controllers/news_controller");


//checkAuth IS ASSIGNED TO THE ROUTE AS MIDDLEWARE BECAUSE ITS A PROTECTED ROUTE AND MUST PASS TOKEN VERIFICATION
router.post("/get_latest_news",    newsController.getLatestNews);
router.post("/get_news",    newsController.getNews);


module.exports = router;
