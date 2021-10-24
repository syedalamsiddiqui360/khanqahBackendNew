const express = require("express");
const router = express.Router();


//const checkAuth = require("../middleware/check-auth");
const personController = require("../controllers/person_controller");


//checkAuth IS ASSIGNED TO THE ROUTE AS MIDDLEWARE BECAUSE ITS A PROTECTED ROUTE AND MUST PASS TOKEN VERIFICATION
router.post("/post",    personController.post);
router.post("/get_by_limit",    personController.getByLimit);
router.post("/get_all",    personController.getAll);
router.post("/get_by_id/:id",    personController.getById);
router.delete("/delete/:id",    personController.delete);
router.put("/update/:id",    personController.update);

router.post("/get_by_type",    personController.getByType);

module.exports = router;
 