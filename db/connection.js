const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "StowsSQL400SQLstowS!!",
    database: "employees"
});

module.exports = connection.promise();