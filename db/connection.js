const mysql = require("mysql2")

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "StowsSQL400SQLstowS!!",
    database: "employees"
});

connection.connect(function (err) {
    if (err) throw err;
});

module.exports = connection;