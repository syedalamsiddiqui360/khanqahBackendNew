const express = require("express");
const router = express.Router();


//const checkAuth = require("../middleware/check-auth");
const audioController = require("../controllers/audio_controller");


//checkAuth IS ASSIGNED TO THE ROUTE AS MIDDLEWARE BECAUSE ITS A PROTECTED ROUTE AND MUST PASS TOKEN VERIFICATION
router.post("/post",    audioController.post);
router.post("/get_by_limit",    audioController.getByLimit);
router.post("/get_all",    audioController.getAll);
router.post("/get_by_id/:id",    audioController.getById);
router.delete("/delete/:id",    audioController.delete);
router.put("/update/:id",    audioController.update);

router.post("/download",    audioController.download);
router.get("/get/:fileName",    audioController.getFile);

router.post("/get_all_by_type_person",    audioController.getAllByTypeAndPerson);
router.post("/get_all_by_type_person_category",    audioController.getAllByTypePersonCategory);
router.post("/get_all_by_category",    audioController.getAllByCategory);
router.post("/get_all_by_Search",    audioController.getAllBySearch);
router.post("/get_all_by_type",    audioController.getAllByType);

router.post("/get_by_type",    audioController.getByType);


module.exports = router;
