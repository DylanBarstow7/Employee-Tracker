const inquirer = require('inquirer');
const db = require("./db/index.js");
require('console.table');


init()
  
function init(){
  renderOptionList();
}

function renderOptionList() {
  inquirer.prompt([
    {
      type: "list",
      name: "options",
      message: "Please select from the following:\n",
      choices: [
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "Add a Department",
        "Add a Role",
        "Add an Employee",
        "Update an Employee Role",
        "Quit"],
      },
  // created switch cases for the roles
  ]).then((response) => {
    switch(response.options) {
      case "View All Departments":
        showAllDeps();
        break;
      case "View All Roles":
        showAllRoles();
        break;
      case "View All Employees":
        showAllEmps();
        break;
      case "Add a Department":
        addDep();
        break;
      case "Add a Role":
        addRole();
        break;
      case "Add an Employee":
        addNewEmp();
        break;
      case "Update an Employee Role":
        updEmpRole();
        break;
      default:
        quit();
      }
		}
  )
}

function showAllDeps(){
  db.findAllDeps().then(([response]) =>{
    console.table(response)
  }).then(()=>renderOptionList());
}

function showAllRoles() {
  db.findAllRoles()
    .then(([response]) => {
      console.table(response)
    }).then(() => renderOptionList());
}

function showAllEmps() {
  db.findAllEmps()
    .then(([response]) => {
      console.table(response)
    }).then(() => renderOptionList());
}

function addDep() {
  inquirer.prompt([
    {
      name: "name",
      message: "Name your department\n"
    },
  ])
  .then((response) =>
    db.createDep(response.depName))
      .then(()=>renderOptionList());
}

function addRole(){
  db.findAllDeps()
  .then(([response]) =>{
    const departments = response.map(({id,depName})=>({
      name: depName,
      value: id
    }));

    inquirer.prompt(
      [
        {
          type: "input",
          message: "Choose new role\n",
          name: "title",
        },
        {
          type: "input",
          message: "Choose new salary\n",
          name: "salary",
        },
        {
          type: "list",
          message: "Choose new department\n",
          choices: departments,
          name: "depId",
        }
      ]
    )
      .then((response)=> {
        db.createRole(response.title,response.salary,response.depId)
      })
      .then(()=>renderOptionList());
  })
}

function addRole(){
  db.findAllDeps()
  .then(([response]) =>{
    const departments = response.map(({id,depName})=>({
      name: depName,
      value: id
    }));



function updEmpRole() {
  db.findAllEmps()
    .then(([response]) => {
      const empNewRole = response.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
      }))
      inquirer.prompt(
        [{
          type: "list",
          name: "employee",
          message: "Enter employees name to update role",
          choices: empNewRole
          }
        ]
      )
      .then((response) => {
        let empId = response.employee;
        db.findAllRoles()
          .then(([response]) => {
            const roles = response.map(({ id, title }) => ({
              name: title,
              value: id
            }))
            inquirer.prompt([
              {
                type: "list",
                message: "Choose a role for this employee",
                choices: roles,
                name: "role",
              }
            ])
              .then(response => db.updateEmpRole(empId, response.role))
              .then(() => console.log("Updated employee's role"))
              .then(() => renderOptionList());
          });
      })
  })
}

function quit(){
  console.log("Have a nice Day!");
  process.exit();
}