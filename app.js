const express = require("express");
const upload = require('express-fileupload')
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const model = require("./database/models/model");

var swaggerUi = require("swagger-ui-express"),
  swaggerDocument = require("./api/swagger/swagger.json");

var customSwaggerOptions = {
  explorer: true,
  swaggerOptions: {
    authAction: {
      JWT: {
        name: "JWT",
        type: "apiKey",
          schema: {
          in: "header",
          name: "x-access-token",
          description: "",
        },
        value:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNTkyNTYyMDU3LCJleHAiOjE1OTI2NDg0NTd9.uyZxziVwMNL1vyf-EgC8_2mKebKM-rCSgX8_5bBKhvk",
      },
    },
  },
};
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, customSwaggerOptions)
);

app.use(upload())


const userRoutes = require("./api/routes/user");
const audioRoutes = require("./api/routes/audio");
const pdfRoutes = require("./api/routes/pdf");
const personRoutes = require("./api/routes/person");
const typeRoutes = require("./api/routes/type");
const categoryRoutes = require("./api/routes/category");
const imagesRoutes = require("./api/routes/images");
const newsRoutes = require("./api/routes/news");
const sliderRoutes = require("./api/routes/slider");
const followerRoutes = require("./api/routes/follower");

app.use(morgan("dev")); // it will log all the requests.
app.use(bodyParser.urlencoded({ extended: false })); // it will handle request body
app.use(bodyParser.json()); // it will handle request body

//handling cor
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,PATCH");
    return res.status(200).json({});
  }
  next();
});


app.use("/user", userRoutes);
app.use("/audio", audioRoutes);
app.use("/pdf", pdfRoutes);
app.use("/type", typeRoutes);
app.use("/person", personRoutes);
app.use("/category", categoryRoutes);
app.use("/images", imagesRoutes);
app.use("/news", newsRoutes);
app.use("/slider", sliderRoutes);
app.use("/follower", followerRoutes);
// //error handling
app.use((req, res, next) => {
  const error = new Error("not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status);
  res.json({
    error: {
      message: error.message,
      code: error.status,
    },
  });
});


module.exports = app;
