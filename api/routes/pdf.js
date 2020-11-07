const express = require("express");
const router = express.Router();


//const checkAuth = require("../middleware/check-auth");
const bayanController = require("../controllers/audio_controller");


//checkAuth IS ASSIGNED TO THE ROUTE AS MIDDLEWARE BECAUSE ITS A PROTECTED ROUTE AND MUST PASS TOKEN VERIFICATION
router.post("/post",    bayanController.post);

router.post("/download",    bayanController.download);
router.get("/get/:fileName",    bayanController.get);

router.post("/get_all_by_type",    bayanController.getAllByType);
router.post("/get_all_by_person",    bayanController.getAllByPerson);
router.post("/get_all_by_category",    bayanController.getAllByCategory);
router.post("/get_all_by_person_and_category",    bayanController.getAllByPersonAndcategory);
router.post("/get_all_by_type_and_category",    bayanController.getAllByTypeAndPerson);
router.post("/get_all_by_type_and_category",    bayanController.getAllByTypeAndcategory);
router.post("/get_all_by_type_and_person_and_category",    bayanController.getAllByTypeAndPersonAndcategory);

module.exports = router;
