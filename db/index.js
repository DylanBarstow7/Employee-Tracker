const connection = require('./connection');

class Database {
  constructor(connection) {
    this.connection = connection;
	}
	
// This calls the index.js f
	findAllDeps() {
		console.log("Hello");
		return this.connection.query(`
			SELECT department.department_id, department.depName FROM department ORDER BY department.id ASC;`);
		}

	findAllRoles() {
		return this.connection.query(`
			SELECT roles.title, roles.id, department.depName, roles.salary FROM roles JOIN department ON roles.department_id = department.id ORDER BY roles.id ASC;`);
	}

	// findAllManagers(employeeId) {

	// }

	findAllEmp() {
		return this.connection.query(`
			SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.name AS department, roles.salary, CONCAT(manager.first_name," ", manager.last_name) ORDER BY employee.id ASC;`);
	}

	createDep(newDep) {
		return this.connection.query(`INSERT INTO department(dep_name) VALUES (?)`, newDep);
	}

	createRole(roles) {
		return this.connection.promise().query(`INSERT INTO role SET ?`, roles);
	}

	updateEmpRole(empId, roleId) {
		return this.connection.promise().query(`
			UPDATE employee SET role_id = ? WHERE id = ?;`,
			[empId, roleId]
		)
	}
}
module.exports = new Database(connection);