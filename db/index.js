const connection = require('./connection');

class Database {
  constructor(connection) {
    this.connection = connection;
	}

	showAllDepartments() {
		return this.connection.promise().query(
			'SELECT departments.id, departments.name FROM departments ORDER BY departments.id ASC;')
	}

	showAllRoles() {
		return this.connection.promise().query(
			'SELECT roles.title, roles.id, departments.name, roles.salary FROM roles JOIN departments ON roles.departments = departments.id ORDER BY roles.id ASC;'
			)
	}

	showAllEmployees() {
		return this.connection.promise().query(
			'SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, roles.title, departments.name, roles.salary, employee.manager_id FROM employee JOIN roles ON employee.role_id = roles.id ORDER BY employee.id ASC;'
			);
	}

	addDepartment(department){
		return this.connection.promise().query("INSERT INTO department SET ?", department);
	}

module.exports = new Database(connection);