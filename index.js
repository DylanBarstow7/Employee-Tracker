import inquirer from 'inquirer';
import db from "./db";

// creates list of options for the first step of application
function renderOptionList() {
    inquirer.prompt(
        [{
            type: "list",
            name: "options",
            message: "Please select from the following:/n",
            choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"],
        },
        ]
    )
    .then((response) =>
    {
        switch(response.options) {
        case "view all departments":
            viewAllDepartments();
            break;
        case "view all roles":
            viewAllRoles();
            break;
        case "view all employees":
            viewAllEmployees();
            break;
        case "add a department":
            addDepartment();
            break;
        case "add a role":
            addRole();
            break;
        case "add an employee":
            addEmployee();
            break;
        case "update an employee role":
            addEmployeeRole();
            break;
        }
        
        )


}