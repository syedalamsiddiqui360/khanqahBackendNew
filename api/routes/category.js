const express = require("express");
const router = express.Router();


//const checkAuth = require("../middleware/check-auth");
const categoryController = require("../controllers/category_controller");


//checkAuth IS ASSIGNED TO THE ROUTE AS MIDDLEWARE BECAUSE ITS A PROTECTED ROUTE AND MUST PASS TOKEN VERIFICATION
router.post("/post",    categoryController.post);
router.post("/get_by_limit",    categoryController.getByLimit);
router.post("/get_all",    categoryController.getAll);
router.post("/get_by_id/:id",    categoryController.getById);
router.delete("/delete/:id",    categoryController.delete);
router.put("/update/:id",    categoryController.update);

router.post("/get_by_type",    categoryController.getByType);

module.exports = router;
 