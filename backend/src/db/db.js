const mongoose = require("mongoose");
require('dotenv').config();

const dbUri = process.env.DB_URI;
// console.log(uri);
const dbName = process.env.DB_NAME;
// console.log(dbname);
const databaseUrl = `${dbUri}/${dbName}`;
// console.log(databaseUrl);

mongoose.connect(databaseUrl).then(() => {
    console.log("Database connected successfully");
}).catch(error => {
    console.log("Error to connect database");
    console.log(error.name, error.message);
});