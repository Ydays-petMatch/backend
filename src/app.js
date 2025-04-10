const express = require("express");
const cors = require("cors");
const routes = require("./routes");
// const swaggerJsdoc = require("swagger-jsdoc");
// const swaggerUi = require("swagger-ui-express");
const dotenv = require("dotenv");
dotenv.config();
require("./mongoConnection");

const app = express();
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

//access to public folder
app.use(express.static(__dirname + "/public"));

// Enable CORS for all routes
app.use(cors());

// initial route
app.get("/", (req, res) => {
    res.send({ message: "Welcome to the application." });
});

// api routes prefix
app.use("/api", routes);

// run server
app.listen(process.env.PORT || 3000, () => {
  console.log(
    `Server is running on http://localhost:${process.env.PORT}`
  );
});

module.exports = app;
