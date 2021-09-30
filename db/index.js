const connection = require('./connection');

class Database {
  constructor(connection) {
    this.connection = connection;
	}
	findAllDeps(){
		return this.connection.query(`
			SELECT
			department_id, department.depName
			FROM
			department;`)
		}
	findAllRoles() {
		return this.connection.query(`
			SELECT roles.title, roles.id, department.depName, roles.salary
			FROM roles
			JOIN department ON roles.department_id = department.id
			ORDER BY
			roles.id ASC;`)
	}

	findAllEmps() {
		return this.connection.query(`
			SELECTemployee.id, employee.first_name, employee.last_name, roles.title, department.depName, roles.salary, employee.manager_id
			FROM employee
			JOIN roles ON employee.role_id = roles.id
			JOIN department ON roles.department_id = departments.id
			ORDER BY
			employee.id ASC;`)
	}

	createDep(newDep) {
		return this.connection.query(`
		INSERT INTO department(depName)
		VALUES (?)`,newDep)
	}

	createRole(roles) {
		return this.connection.query(`
		INSERT INTO roles
		SET ?`, roles);
	}

	updateEmpRole(empId, roleId) {
		return this.connection.query(`
			UPDATE employee 
			SET role_id = ? 
			WHERE id = ?;`,
			[empId, roleId])
	}
}
module.exports = new Database(connection);