const express = require("express");
const router = express.Router();


//const checkAuth = require("../middleware/check-auth");
const bayanController = require("../controllers/audio_controller");
//const userRequests = require("../requests/user_requests");


//checkAuth IS ASSIGNED TO THE ROUTE AS MIDDLEWARE BECAUSE ITS A PROTECTED ROUTE AND MUST PASS TOKEN VERIFICATION
router.post("/post",    bayanController.post);
router.post("/download",    bayanController.download);
router.get("/get/:folder/:fileName",    bayanController.get);
router.post("/get",    bayanController.get);
router.get("/getall",    bayanController.getAll);
router.post("/getall",    bayanController.getAll);

router.get("/get",function(req,res){
    //res.send([])
    res.sendFile(__dirname+"/index.html");
  })

module.exports = router;
