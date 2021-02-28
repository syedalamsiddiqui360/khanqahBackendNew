const express = require("express");
const router = express.Router();


//const checkAuth = require("../middleware/check-auth");
const imagesController = require("../controllers/images_controller");


//checkAuth IS ASSIGNED TO THE ROUTE AS MIDDLEWARE BECAUSE ITS A PROTECTED ROUTE AND MUST PASS TOKEN VERIFICATION
router.post("/post",    imagesController.post);
router.post("/get_by_slider_id",    imagesController.getBySliderId);



module.exports = router;
