const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const db = require("./config/db");
const adminRoutes = require("./routings/admin");
const recipeRoutes = require("./routings/recipe");
const userRoutes = require("./routings/user");

require("dotenv").config();

db.makeDb();

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.use("/admin", adminRoutes);
app.use("/recipes", recipeRoutes);
app.use("/users", userRoutes);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((err, req, res) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});

app.listen(4000);