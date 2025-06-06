const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require('./swagger');
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();
require("./mongoConnection");

const app = express();
app.use(express.json());
// app.use("/uploads", express.static("uploads"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

//access to public folder
app.use(express.static(__dirname + "/public"));

// Enable CORS for all routes
app.use(cors());


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// api routes prefix
app.use("/api", routes);

// initial route
app.get("/", (req, res) => {
    res.send({ message: "Welcome to the application." });
});

// run server
app.listen(process.env.PORT || 3000, () => {
  console.log(
    `Server is running on http://localhost:${process.env.PORT}`
  );
});

module.exports = app;
