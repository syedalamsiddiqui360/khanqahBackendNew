const express = require("express");
const router = express.Router();


//const checkAuth = require("../middleware/check-auth");
const typeController = require("../controllers/type_controller");


//checkAuth IS ASSIGNED TO THE ROUTE AS MIDDLEWARE BECAUSE ITS A PROTECTED ROUTE AND MUST PASS TOKEN VERIFICATION
router.post("/post",    typeController.post);

router.post("/get",    typeController.get);
router.post("/get_by_id",    typeController.getById);

module.exports = router;
