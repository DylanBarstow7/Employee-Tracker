const connection = require('./connection');

class Database {
  constructor(connection) {
    this.connection = connection;
	}

	findAllDepartments() {
		return this.connection.promise().query(
			'SELECT departments.id, departments.name FROM departments ORDER BY departments.id ASC;');
	}

	findAllRoles() {
		return this.connection.promise().query(
			'SELECT roles.title, roles.id, departments.name, roles.salary FROM roles LEFT JOIN departments ON roles.departments = departments.id ORDER BY roles.id ASC;');
	}

	findAllEmployees() {
		return this.connection.promise().query(
			'SELECT employee.id, employee.first_name, employee.last_name, roles.title, departments.name AS department, roles.salary, CONCAT(manager.first_name," ", manager.last_name) ORDER BY employee.id ASC;');
	}

	createDepartment(departments) {
		return this.connection.promise().query("INSERT INTO departments SET ?", departments);
	}

	createRole(roles) {
		return this.connection.promise().query("INSERT INTO roles SET ?", roles);
}

}
module.exports = new Database(connection);