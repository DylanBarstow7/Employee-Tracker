const connection = require('./connection');

class Database {
  constructor(connection) {
    this.connection = connection;
	}

	findAllDepartments() {
		return this.connection.promise().query(
			'SELECT department.id, department.name FROM department ORDER BY department.id ASC;');
	}

	findAllRoles() {
		return this.connection.promise().query(
			'SELECT role.title, role.id, department.name, role.salary FROM roles LEFT JOIN department ON roles.department_id = department.id ORDER BY department.id ASC;');
	}

	// findAllManagers(employeeId) {

	// }

	allEmployees() {
		return this.connection.promise().query(
			'SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name," ", manager.last_name) ORDER BY employee.id ASC;');
	}

	createDepartment(department) {
		return this.connection.promise().query("INSERT INTO department SET ?", department);
	}

	createRole(role) {
		return this.connection.promise().query("INSERT INTO role SET ?", role);
	}

	updateEmployeeRole(employeeId, roleId) {
		return this.connection.promise().query(
			"UPDATE employee SET role_id = ? WHERE id = ?",
			[employeeId, roleId]
		);
	}
}
module.exports = new Database(connection);