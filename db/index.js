const connection = require('./connection');

class Database {
  constructor(connection) {
    this.connection = connection;
	}

	showAllDepartments() {
		return this.connection.promise().query(
			'SELECT departments.id, departments.dept_name FROM departments ORDER BY departments.id ASC;')
	}

	showAllRoles() {
		return this.connection.promise().query(
			'SELECT roles.id, roles.title, roles.salary, roles.department_id, departments.name FROM roles JOIN departments ON roles.departments = departments.id ORDER BY roles.id ASC;'
			)
	}

	showAllEmployees() {
		return this.connection.promise().query(
			'SELECT employees.id, employees.first_name, employees.role_id, employees.manager_id FROM employees ORDER BY employees.id ASC;'
			);
	}




module.exports = new Database(connection);