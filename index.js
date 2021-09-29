const inquirer = require('inquirer');
const db =require("./db");
require('console.table')

// creates list of options for the first step of application

function renderOptionList() {
  inquirer.prompt(
    [{
      type: "list",
      name: "options",
      message: "Please select from the following:/n",
      choices: [
          "view all departments", 
          "view all roles", 
          "view all employees", 
          "add a department", 
          "add a role", 
          "add an employee", 
          "update an employee role"
        ],
      },
    ]
  )
// created switch cases for the roles
  .then((response) =>
  {
  switch(response.options) {
    case "View all departments":
      showAllDepartments();
      break;
    case "View all roles":
      showAllRoles();
      break;
    case "View all employees":
      showAllEmployees();
      break;
		case "Add a department":
      addDepartment();
      break;
    case "Add a role":
      addRole();
      break;
    case "Add an employee":
      addEmployee();
      break;
    case "Update an employee role":
      addEmployeeRole();
      break;
    default:
        quit();
      }
		}	
  )
}

function showAllDepartments() {
  db.showAllDepartments()
    .then(([rows]) => {
      let departments = rows;
        console.log("\n");
      console.table(departments);
    })
    .then(() => loadMainPrompts());
}

function showAllRoles() {
  db.showAllRoles()
    .then(([rows]) => {
      let roles = rows;
        console.log("\n");
      console.table(roles);
    })
    .then(() => loadMainPrompts());
}

function showAllEmployees() {
  db.showAllEmployees()
    .then(([rows]) => {
      let employees = rows;
        console.log("\n");
      console.table(employees);
    })
    .then(() => loadMainPrompts());
}

function quit(){
  console.log("Have a nice Day!");
  process.exit();
}