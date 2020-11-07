const express = require("express");
const router = express.Router();

const MenuLinksController = require("../controllers/menu_links_controller");

router.post("/header_links",  MenuLinksController.getHeaderLinks);

router.post("/footer_links",  MenuLinksController.getFooterLinks);

module.exports = router;
