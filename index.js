const inquirer = require('inquirer');
const db = require("./db/index.js");
require('console.table');


renderOptionList();

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
        addEmp();
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
      // .then(() => console.log(`Added ${name} to the database`))
      .then(()=>renderOptionList());
}

function addRole(){
  db.createRole()
  .then(([response]) =>{
    const department = response.map(({id,depName})=>({
      name: depName;
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
          type: "input",
          message: "Choose new department\n",
          choices: department,
          name: "deptId",
        },



      ])

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
      .then(response => {
        let empId = res.empId;
        db.findAllRoles()
          .then(([response]) => {
            let roles = response;
            const roleOptions = roles.map(({ id, title }) => ({
              name: title,
              value: id
            }));
            prompt([
              {
                type: "list",
                name: "roleId",
                message: "Choose a role for this employee",
                choices: roleOptions
              }
            ])
              .then(response => db.updateEmpRole(empId, response.roleId))
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