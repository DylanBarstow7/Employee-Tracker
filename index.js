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
  db.queryAllDeps().then(([rows])=>{
    let depts = rows;
    console.log("\n");
    console.table(depts);
  }).then(()=>renderOptionList());
}

function showAllRoles(){
  db.queryAllRoles().then(([rows])=>{
      console.table(rows)
    }).then(() => renderOptionList());
}

function showAllEmps() {
  db.queryAllEmps().then(([rows]) => {
      console.table(rows)
    }).then(() => renderOptionList());
}

function addDep() {
  inquirer.prompt([
    {
      name: "name",
      message: "Name your new department:\n"
    },
  ])
  .then((response) =>
    db.createDep(response.depName))
      .then(()=>renderOptionList());
}

function addRole(){
  db.queryAllDeps()
  .then(([response]) =>{
    const departments = response.map(({id,depName})=>({
      name: depName,
      value: id
    }));

    inquirer.prompt(
      [
        {
          type: "input",
          message: "Choose new role:\n",
          name: "title",
        },
        {
          type: "input",
          message: "Choose new salary:\n",
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
// runs when "add an employee chosen"
function addNewEmp(){
  inquirer.prompt(
    [{
      message: "Enter new employees first name:\n",
      name: "first",
    },
    {
      message: "Enter new employees last name:\n",
      name: "last",
    },]
  )
  .then((response)=>{
    let empFName = response.first;
    let empLName = response.last;
  
    db.queryAllRoles()
      .then(([response]) => {
        const roles = response.map(({id,title})=>({
          name: title,
          value: id
        }));
        inquirer.prompt(
          [{
            type: "list",
            message: "Choose the new Employee's role:\n",
            name: "role",
            choices: roles
          },]
        )
        .then(response=>{
          let newEmpRole = response.role;
          db.queryAllEmps()
            .then(([response])=> {
              const employees = response.map(({id,first_name,last_name})=>({
                name: `${first_name} ${last_name}`,
                value: id
              }));
              inquirer.prompt(
                [{
                  type: "list",
                  message: "Who is the manager of the new Employee?\n",
                  name: "manager",
                  choices: employees,
                },]
              )
              .then(response =>{
                let empManager = response.manager
                db.queryNewEmp(empFName,empLName,newEmpRole,empManager)
              })
              .then(()=>renderOptionList());
            });
        });
      });
  });
}


function updEmpRole() {
  db.queryAllEmps()
    .then(([response]) => {
      const empNewRole = response.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
      }))
      inquirer.prompt(
        [{
          type: "list",
          name: "employee",
          message: "Enter employees name to update role:\n",
          choices: empNewRole
          }
        ]
      )
      .then((response) => {
        let empId = response.employee;
        db.queryAllRoles()
          .then(([response]) => {
            const empOptions = response.map(({ id, title }) => ({
              name: title,
              value: id
            }))
            inquirer.prompt([
              {
                type: "list",
                message: "Choose a role for this employee:",
                choices: roles,
                name: "role",
              }
            ])
              .then(response => db.queryUpdRole(empId, response.role))
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