const express = require("express");
const router = express.Router();


const checkAuth = require("../middleware/check-auth");
const newsController = require("../controllers/news_controller");


//checkAuth IS ASSIGNED TO THE ROUTE AS MIDDLEWARE BECAUSE ITS A PROTECTED ROUTE AND MUST PASS TOKEN VERIFICATION
router.post("/post",    newsController.post);
router.post("/get_by_limit",    newsController.getByLimit);
router.post("/get_by_id/:id",    newsController.getById);
router.delete("/delete/:id",    newsController.delete);
router.put("/update/:id",    newsController.update);

router.post("/get_latest_news",    newsController.getLatestNews);
router.post("/get_news",    newsController.getNews);


module.exports = router;
