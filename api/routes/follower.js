const express = require("express");
const router = express.Router();


//const checkAuth = require("../middleware/check-auth");
const followerController = require("../controllers/follower_controller");


//checkAuth IS ASSIGNED TO THE ROUTE AS MIDDLEWARE BECAUSE ITS A PROTECTED ROUTE AND MUST PASS TOKEN VERIFICATION
router.post("/add_whatsapp_no",    followerController.addWhatsAppNumber);
router.post("/add_mobile_no",    followerController.addMobileNumber);


module.exports = router;
