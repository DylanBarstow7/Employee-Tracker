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
  );
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
      let role = rows;
        console.log("\n");
      console.table(role);
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
      .then(() => renderOptionList());
  });
}

function updateEmployeeRole() {
  db.allEmployees()
    .then(([rows]) =>{
      let employees = rows;
      const employeeOptions = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
      }));
      prompt([
        {
          type: "list",
          name: "employeeId",
          message: "Which employee's role do you want to update?",
          choices: employeeOptions
        }
      ])
        .then(res => {
          let employeeId = res.employeeId;
          db.findAllRoles()
            .then(([rows]) => {
              let roles = rows;
              const roleOptions = roles.map(({ id, title }) => ({
                name: title,
                value: id
              }));
              prompt([
                {
                  type: "list",
                  name: "roleId",
                  message: "Which role do you want to assign the selected employee?",
                  choices: roleOptions
                }
              ])
                .then(res => db.updateEmployeeRole(employeeId, res.roleId))
                .then(() => console.log("Updated employee's role"))
                .then(() => loadMainPrompts())
            });
        });
    })
}
function quit(){
  console.log("Have a nice Day!");
  process.exit();
}