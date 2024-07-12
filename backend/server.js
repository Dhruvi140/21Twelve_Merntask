const express = require("express");
require("dotenv").config();
const cors = require("cors");
const dbConnection = require("./src/db/db");
const bodyParser = require("body-parser");
const CustomError = require("./src/utills/CustomError");
const ErrorController = require("./src/controllers/errorController");
const path = require('path');


const UserRoute = require("./src/routes/userRoutes");
const authRoute = require("./src/routes/AuthRoutes");


process.on("uncaughtException", (error) => {
    console.log(error.name, error.message);
    console.log("Application shutting down...");
    process.exit(1);
});

const app = express();

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const shopRoutes = require('./src/routes/shopRoutes')






console.log(dbConnection);

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '10mb' }))


app.use("/api", UserRoute);
app.use("/api", authRoute);
app.use("/api",shopRoutes);






app.get("/", (req, res) => {
    res.json({ "message": "CRUD API using express and mongodb" });
});

app.all("*", (req, res, next) => {
    // const err = new Error(`Can't find ${req.originalUrl} on the server!`);
    // err.status = "fail";
    // err.statusCode = 404;
    const err = new CustomError(`Can't find ${req.originalUrl} on the server!`, 404);
    next(err);
});

app.use(ErrorController);

app.listen(process.env.PORT, () => {
    console.log("Server is listening on port", process.env.PORT);
});