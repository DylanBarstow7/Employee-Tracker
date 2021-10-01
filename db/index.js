const connection = require('./connection');


// class Database
class Database {
	constructor(connection) {
    this.connection = connection;
	}

	// FULL TABLE RETURNS
	queryAllDeps(){
		// 
		return this.connection.promise().query(`
			SELECT
			department.id, department.depName
			FROM
			department;`);
		}
	queryAllRoles() {
		return this.connection.promise().query(`
			SELECT roles.title, roles.id, department.depName, roles.department_id, roles.salary
			FROM roles
			JOIN department ON roles.department_id = department.id
			ORDER BY
			roles.id ASC;`);
	}
	queryAllEmps() {
		return this.connection.promise().query(`
			SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.depName, roles.salary, employee.manager_id
			FROM employee
			JOIN roles ON employee.role_id = roles.id
			JOIN department ON roles.department_id = department.id
			ORDER BY
			employee.id ASC;`);
	}

	// CREATION
	createDep(department) {
		return this.connection.promise().query(`
		INSERT INTO department SET ?`, department);
	}

	createRole(roles) {
		return this.connection.promise().query(`
		INSERT INTO roles SET ?`, roles);
	}

	queryNewEmp(employee){
		return this.connection.promise().query(`
		INSERT INTO employee SET ?`, employee);
	}

	queryUpdRole(empId,roleId) {
		return this.connection.promise().query(`
			UPDATE employee 
			SET role_id = ? 
			WHERE id = ?`,
			[roleId,empId]);
	}

	// DELETION
	fireEmpNum(empId){
		return this.connection.promise().query(`
		DELETE FROM employee WHERE id = ?`, empId);
	}

	eliminateDep(depId){
		return this.connection.promise().query(`
		DELETE FROM department WHERE id = ?`, depId);
	}

	removeRole(roleId){
		return this.connection.promise().query(`
		DELETE FROM roles WHERE id = ?`, roleId);
	}
}

module.exports = new Database(connection);