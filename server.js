const express = require("express");
const app = express();
const mysql = require('mysql');
const routes = require("./routes/main");

require("dotenv").config({ path: "./config/.env" });

const config = {
    user: process.env.SQL_USER,
    database: process.env.SQL_DATABASE,
    password: process.env.SQL_PASSWORD,
    socketPath: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`
}

/*
let connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.SQL_USER,
    database: process.env.SQL_DATABASE,
    password: process.env.SQL_PASSWORD,
});
*/

//const connection = mysql.createConnection(config);
/*
connection.connect(function(err) {
    if (err) throw err;
    console.log("DB Connected!");
});
*/


app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Setup Routes
app.use("/", routes);

//Server Running
app.listen(process.env.PORT, () => {
  console.log(`Server is running, on port ${process.env.PORT}`);
});
