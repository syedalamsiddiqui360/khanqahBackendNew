const express = require("express");
const router = express.Router();


//const checkAuth = require("../middleware/check-auth");
const audioController = require("../controllers/audio_controller");


//checkAuth IS ASSIGNED TO THE ROUTE AS MIDDLEWARE BECAUSE ITS A PROTECTED ROUTE AND MUST PASS TOKEN VERIFICATION
router.post("/post",    audioController.post);

router.post("/download",    audioController.download);
router.get("/get/:fileName",    audioController.get);

router.post("/get_all_by_type_person",    audioController.getAllByTypeAndPerson);
router.post("/get_all_by_type_person_category",    audioController.getAllByTypePersonCategory);
router.post("/get_all_by_category",    audioController.getAllByCategory);
router.post("/get_all_by_type",    audioController.getAllByType);


module.exports = router;
