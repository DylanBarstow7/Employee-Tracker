const connection = require('./connection');

class Database {
  constructor(connection) {
    this.connection = connection;
	}


module.exports = new Database(connection);