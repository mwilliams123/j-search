const express = require("express");
const app = express();
const mysql = require('mysql2');
const routes = require("./routes/main");

require("dotenv").config({ path: "./config/.env" });

var config = {
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
};

// Later on when running from Google Cloud, env variables will be passed in container cloud connection config
if(process.env.NODE_ENV === 'production') {
  console.log('Running from cloud. Connecting to DB through GCP socket.');
  config.socketPath = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`;
}

// When running from localhost, get the config from .env
else {
  console.log('Running from localhost. Connecting to DB directly.');
  config.host = process.env.DB_HOST;
}

let connection = mysql.createConnection(config);

connection.connect(function(err) {
  if (err) {
    console.error('Error connecting: ' + err.stack);
    return;
  }
  console.log('Connected as thread id: ' + connection.threadId);
});

app.set('connection', connection)


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
