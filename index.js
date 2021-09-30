const inquirer = require('inquirer');
const db = require("./db");
require('console.table');


renderOptionList();

function renderOptionList() {
  inquirer.prompt([
    {
      type: "list",
      name: "option",
      message: "Please select from the following:\n",
      choices: [
        {  
          name: "View all departments",
          value: "VIEW_ALL_DEPS"
        },
        {
          name: "View all roles",
          value: "VIEW_ALL_ROLES"
        },
        {
          name: "View all employees",
          value: "VIEW_ALL_EMP"
        },
        {
          name: "Add a department",
          value: "ADD_DEP"
        },
        {
          name: "Add a role", 
          value: "ADD_ROLE"
        },
        {
          name:  "Add an employee",
          value: "ADD_EMP"
        },
        {
          name:  "Update an employee role",
          value: "UPD_EMP_ROLE"
        },
        {
          name: "Quit",
          value: "QUIT"
        }
      ]
    }
  // created switch cases for the roles
  ]).then(res => {
    let option = res.option;

    switch (option) {
    case "VIEW_ALL_DEPS":
      showAllDeps();
      break;
    case "VIEW_ALL_ROLES":
      showAllRoles();
      break;
    case "VIEW_ALL_EMP":
      showAllEmps();
      break;
		case "ADD_DEP":
      addDep();
      break;
    case "ADD_ROLE":
      addRole();
      break;
    case "ADD_EMP":
      addEmp();
      break;
    case "UPD_EMP_ROLE":
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
    .then(([res]) => {
      let employees = res;
      console.table(employees);
    }).then(() => renderOptionList());
}

function showAllEmps() {
  db.findAllEmps()
    .then(([res]) => {
      console.table(res);
    }).then(() => renderOptionList());
}

function addDep() {
  inquirer.prompt([
    {
      name: "name",
      message: "Name your department\n"
    },
  ])
  .then((res) =>
    db.queryCreateDep(res.name))
      // .then(() => console.log(`Added ${name} to the database`))
      .then(()=>renderOptionList());
}

function updEmpRole() {
  db.findAllEmps()
    .then(([res]) => {
      const empNewRole = res.map(({ id, first_name, last_name }) => ({
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
      .then(res => {
        let empId = res.empId;
        db.findAllRoles()
          .then(([res]) => {
            let roles = res;
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
              .then(res => db.updateEmpRole(empId, res.roleId))
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