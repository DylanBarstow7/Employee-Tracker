const connection = require('./connection');

class Database {
  constructor(connection) {
    this.connection = connection;
	}

	showAllDepartments() {
		return this.connection.promise().query(
			'SELECT departments.id, departments.dept_name FROM departments;'
			);
	}




	

module.exports = new Database(connection);