const express = require("express");
const router = express.Router();


//const checkAuth = require("../middleware/check-auth");
const categoryController = require("../controllers/category_controller");


//checkAuth IS ASSIGNED TO THE ROUTE AS MIDDLEWARE BECAUSE ITS A PROTECTED ROUTE AND MUST PASS TOKEN VERIFICATION
router.post("/post",    categoryController.post);

router.post("/get",    categoryController.get);
router.post("/get_by_type",    categoryController.getByType);

module.exports = router;
 