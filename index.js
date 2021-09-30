const inquirer = require('inquirer');
const db =require("./db");
require('console.table');

// creates list of options for the first step of application
renderOptionList();

function renderOptionList() {
  inquirer.prompt([
    {
      type: "list",
      name: "option",
      message: "Please select from the following",
      choices: [
          "View all departments", 
          "View all roles", 
          "View all employees", 
          "Add a department", 
          "Add a role", 
          "Add an employee", 
          "Update an employee role,"
        ],
    },
  ]
)
  // created switch cases for the roles
  .then((response) => {
  switch (response.option) {
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
  db.findAllDepartments()
    .then(([rows]) => {
      let departments = rows;
        console.log("\n");
      console.table(departments);
    })
    .then(() => renderOptionList());
}

function showAllRoles() {
  db.findAllRoles()
    .then(([rows]) => {
      let roles = rows;
        console.log("\n");
      console.table(roles);
    })
    .then(() => renderOptionList());
}

function showAllEmployees() {
  db.findAllEmployees()
    .then(([rows]) => {
      let employees = rows;
        console.log("\n");
      console.table(employees);
    })
    .then(() => renderOptionList());
}

function addDepartment() {
  prompt([
    {
      name: "name",
      message: "Name your department"
    }
  ])
  .then(res => {
    let name = res;
    db.createDepartment(name)
      .then(() => console.log(`Added ${name.name} to the database`))
      .then(() => renderOptionList())
  })
}



function quit(){
  console.log("Have a nice Day!");
  process.exit();
}