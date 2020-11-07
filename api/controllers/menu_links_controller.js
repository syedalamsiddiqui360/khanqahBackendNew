const menu_links = require("../../database/models/menu_links");
const menu_link_content = require("../../database/models/menu_link_content");

exports.getHeaderLinks = async (req, res, next) => {
  try {
    console.log("testing");
    var language_id = req.body.language_id ? req.body.language_id : 1;
    const data = await menu_links.findAll({
      where: { is_active: 1, is_footer_link: 0 },
      include: [
        {
          model: menu_link_content,
          where: { language_id: language_id },
        },
      ],
    });
    res.statusCode = 200;
    res.send({ data });
  } catch (e) {
    console.log(e);
    res.statusCode = 300;
    res.send("Please Check log DataBase Error");
  }
};

exports.getFooterLinks = async (req, res, next) => {
  try {
    var language_id = req.body.language_id ? req.body.language_id : 1;
    const data = await menu_links.findAll({
      where: { is_active: 1, is_footer_link: 1 },
      include: [
        {
          model: menu_link_content,
          where: { language_id: language_id },
        },
      ],
    });
    res.statusCode = 200;
    res.send({ data });
  } catch (e) {
    console.log(e);
    res.statusCode = 300;
    res.send("Please Check log DataBase Error");
  }
};
