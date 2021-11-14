const express = require("express");
const router = express.Router();


//const checkAuth = require("../middleware/check-auth");
const sliderController = require("../controllers/slider_controller");


//checkAuth IS ASSIGNED TO THE ROUTE AS MIDDLEWARE BECAUSE ITS A PROTECTED ROUTE AND MUST PASS TOKEN VERIFICATION
router.post("/post",    sliderController.post);
router.post("/get_by_limit",    sliderController.getByLimit);
router.post("/get_by_id/:id",    sliderController.getById);
router.delete("/delete/:id",    sliderController.delete);
router.put("/update/:id",    sliderController.update);

router.post("/get_all",    sliderController.getAll);

module.exports = router;
