const express = require("express");
const router = express.Router();


//const checkAuth = require("../middleware/check-auth");
const pdfController = require("../controllers/pdf_controller");


//checkAuth IS ASSIGNED TO THE ROUTE AS MIDDLEWARE BECAUSE ITS A PROTECTED ROUTE AND MUST PASS TOKEN VERIFICATION
router.post("/post",    pdfController.post);
router.post("/get_by_limit",    pdfController.getByLimit);
router.post("/get_all",    pdfController.getAll);
router.post("/get_by_id/:id",    pdfController.getById);
router.delete("/delete/:id",    pdfController.delete);
router.put("/update/:id",    pdfController.update);

router.get("/download/:fileName",    pdfController.download);
router.get("/get/:fileName",    pdfController.get);

router.post("/get_all_by_type_person",    pdfController.getAllByTypeAndPerson);
router.post("/get_all_by_type_person_category",    pdfController.getAllByTypePersonCategory);
router.post("/get_all_by_category",    pdfController.getAllByCategory);
router.post("/get_all_by_type",    pdfController.getAllByType);
router.post("/get_all_by_Search",    pdfController.getAllBySearch);
router.post("/get_by_type",    pdfController.getByType);
module.exports = router;
