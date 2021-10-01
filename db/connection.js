const mysql = require('mysql2');

// creating the connection & entering
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "StowsSQL400SQLstowS!!",
    database: 'employees_db',
  },
  console.log(`Connected to the employees_db database.`)
);

connection.connect(function (err) {
    if (err) throw err;
});

module.exports = connection;