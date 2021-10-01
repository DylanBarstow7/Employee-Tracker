const { prompt } = require('inquirer');
const db = require("./db/index.js");
require('console.table');


const options = [
  {
      type: "list",
      name: "choice",
      message: "Please select from the following:\n",
      choices: [
          {
              name: "View All Departments",
              value: "VIEW_DEPARTMENTS",
          },
          {
              name: "View All Roles",
              value: "VIEW_ROLES",
          },
          {
              name: "View All Employees",
              value: "VIEW_EMPLOYEES",
          },
          {
              name: "Add a Department",
              value: "ADD_DEPARTMENT",
          },
          {
              name: "Add a Role",
              value: "ADD_ROLE",
          },
          {
              name: "Add an Employee",
              value: "ADD_EMPLOYEE",
          },
          {
              name: "Update an Employee Role",
              value: "UPDATE_EMPLOYEE_ROLE",
          },
          {
              name: "Quit",
              value: "QUIT",
          },
      ],
  },
];

init()
// runs on node index.js
// activates renderOptionList fxn
function init(){
  console.log("Welcome to Employee-Tracker");
  renderOptionList();
}
// triggered by init this begins rendering prompts
// function renderOptionList() {
//   // provides functionality to prompt
//   // displays the message/choices in a list
//   prompt(
//     [{
//       type: "list",
//       name: "options",
//       message: "Please select from the following:\n",
//       choices: [
//         "View All Departments",
//         "View All Roles",
//         "View All Employees",
//         "Add a Department",
//         "Add a Role",
//         "Add an Employee",
//         "Update an Employee Role",
//         "Quit"],
//       },
  // created switch cases for the roles
  // case = visual options
function renderOptionList(){
  prompt(options).then((res) => {
    let choice = res.choice;
    switch(choice) {
      case "VIEW_DEPARTMENTS":
    // if "View all departments" is chosen from earlier list 'showAllDeps()' will be called
        showAllDeps();
        break;
      case "VIEW_ROLES":
        showAllRoles();
        break;
      case "VIEW_EMPLOYEES":
        showAllEmps();
        break;
      case "ADD_DEPARTMENT":
        addDep();
        break;
      case "ADD_ROLE":
        addRole();
        break;
      case "ADD_EMPLOYEE":
        addNewEmp();
        break;
      case "UPDATE_EMPLOYEE_ROLE":
        updEmpRole();
        break;
      default:
        quit();
      }
		}
  );
}

// when showAllDeps() is called this fxn runs a database query
function showAllDeps(){
  db.queryAllDeps().then(([response])=>{
    let departments = response;
    console.log("\n");
    console.table(departments);
  }).then(()=>renderOptionList());
}

function showAllRoles(){
  db.queryAllRoles().then(([response])=>{
      console.table(response)
    }).then(() => renderOptionList());
}

function showAllEmps() {
  db.queryAllEmps().then(([response]) => {
      console.table(response)
    }).then(() => renderOptionList());
}

function addDep() {
  prompt([
    {
      name: "depName",
      message: "Name your new department:"
    },
  ])
  .then((response) => {
    let name = response;
    db.createDep(name)
      // .then(()=>console.log(`Added ${name.depName} to the database`))
      .then(()=>renderOptionList());
  });
}

function addRole(){
  db.queryAllDeps()
  .then(([response]) =>{
    const departments = response.map(({id,depName})=>({
      name: depName,
      value: id
    }));

    prompt(
      [
        {
          type: "input",
          message: "Choose new roles Title:",
          name: "title",
        },
        {
          type: "input",
          message: "Choose new salary:",
          name: "salary",
        },
        {
          type: "list",
          message: "Choose new department:\n",
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
// runs when "add an employee" chosen
function addNewEmp(){
  prompt(
    [{
      message: "Enter new employees first name:",
      name: "first_name",
    },
    {
      message: "Enter new employees last name:",
      name: "last_name",
    },
  ])
  .then((response)=>{
    let firstName = response.first_name;
    let lastName = response.last_name;
  
    db.queryAllRoles()
      .then(([rows]) => {
        let roles = rows;
        const roleOptions = roles.map(({id,title})=>({
          name: title,
          value: id
        }));
        prompt(
          {
            type: "list",
            message: "Choose the new Employee's role:\n",
            name: "roleId",
            choices: roleOptions,
          })
        .then(response => {
          let roleId = response.roleId;
          db.queryAllEmps()
            .then(([rows]) => {
              let employees = rows;
              const manaOptions = employees.map(({id,first_name,last_name})=>({
                name: `${first_name} ${last_name}`,
                value: id,
              }));
              prompt(
                {
                  type: "list",
                  message: "Who is the manager of the new Employee?\n",
                  name: "managerId",
                  choices: manaOptions,
                })
              .then(response => {
                let employee = {
                  manager_id: response.managerId,
                  role_id: roleId,
                  first_name: firstName,
                  last_name: lastName   
                }
              db.queryNewEmp(employee);
              })
              .then(() => console.log(
                `${firstName} ${lastName} added to the database`
              ))
              .then(()=>renderOptionList())
            })
          })
      })
  })
}

function updEmpRole() {
  db.queryAllEmps()
    .then(([rows]) => {
      let employees = rows;
      const empOptions = employees.map(({id,first_name,last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
      }));
      prompt(
        [{
          type: "list",
          name: "empId",
          message: "Choose employee to update role:\n",
          choices: empOptions
          }
      ])
      .then(response => {
        let empId = response.empId;
        db.queryAllRoles()
          .then(([rows]) => {
            let roles = rows;
            const roleOptions = roles.map(({ id, title }) => ({
              name: title,
              value: id
            }));
            prompt([
              {
                type: "list",
                message: "Choose a role for this employee:\n",
                choices: roleOptions,
                name: "roleId",
              },
            ])
              .then(response => db.queryUpdRole(empId, response.roleId))
              .then(() => console.log("Updated employee's role"))
              .then(() => renderOptionList());
          });
      })
  })
}

function quit(){
  console.log("Have a good time!");
  process.exit()
}