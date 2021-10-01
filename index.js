const { prompt } = require('inquirer');
const db = require("./db/index.js");
require('console.table');


// list of available prompt options
// displays the message/choices seen by user in a list
const options = [
  {
      type: "list",
      name: "choice",
      message: "Please select from the following:\n",
      choices: [
          {
              name: "View All Departments",
              // user sees name attribute
              value: "VIEW_DEPARTMENTS",
              // value is sent into switch statement
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
              name: "Fire an Employee",
              value: "YOURE_FIRED",
          },
          {
              name: "Eliminate a Department",
              value: "DEPARTMENT_ELIMINATED",
          },
          {
              name: "Remove a Role Title",
              value: "DELETE_ROLE",
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

// triggered by init this begins rendering prompt
// provides functionality to prompt
// prompt displays questions to user
function renderOptionList(){
  // initiates 'options' fxn
  // is returned with a value: response from choice list
  prompt(options).then((response) => {
    let choice = response.choice;
    // switch case activates next fxn based on choice made in options list
    // if "View all departments" option is chosen from the prompt,
    // value of "VIEW_DEPARTMENTS" is used to call 'showAllDeps()' fxn
    switch(choice) {
      case "VIEW_DEPARTMENTS":
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
      case "YOURE_FIRED":
        fireEmployee();
        break;
      case "DEPARTMENT_ELIMINATED":
        depElimination();
        break;
      case "DELETE_ROLE":
        deleteRole();
        break;
      default:
        quit();
      }
		}
  );
}

// activated via chosen case "VIEW_DEPARTMENTS"
function showAllDeps(){
  // when showAllDeps() is called this fxn runs a database query
  db.queryAllDeps().then(([response])=>{
    // once we receive a response from queryAllDeps we declare the response into a local variable, here it's named 'departments'
    let departments = response;
    console.log("\n");
    // displays db table from response into terminal
    console.table(departments);
  // then return to the original questions list
  }).then(()=>renderOptionList());
}

// process identical to Deps with different db query calls
function showAllRoles(){
  db.queryAllRoles().then(([response])=>{
      console.log("\n");
      console.table(response)
    }).then(() => renderOptionList());
}

// process identical to Deps with different db query calls
function showAllEmps() {
  db.queryAllEmps().then(([response]) => {
      console.log("\n");
      console.table(response)
    }).then(() => renderOptionList());
}

// add-department fxn 
function addDep() {
  prompt([
    {
      message: "Name your new department:",
      name: "depName"
    },
  ])
  .then((response) => {
    let name = response;
    db.createDep(name)
      .then(()=>console.log(`Added ${name.depName} to the database`))
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

// deletion fxn's begin
function fireEmployee() {
  console.log("\n");
  db.queryAllEmps()
    .then(([rows])=>{
    let employees = rows;
    const empOptions = employees.map(({ id,first_name,last_name})=>({
      name: `${first_name} ${last_name}`,
      value: id
    }));
    prompt([
      {
        type: "list",
        name: "empId",
        message: "Which employee do you want to fire?",
        choices: empOptions
      }
    ])
      .then(response => db.fireEmpNum(response.empId))
      .then(() => console.log(`Removed employee from the database`))
      .then(() => renderOptionList())
  })
}

function depElimination() {
  console.log("\nWarning: This will also remove associated roles and employees");
  db.queryAllDeps()
    .then(([rows])=>{
    let departments = rows;
    const depOptions = departments.map(({id,name})=>({
      name: name,
      value: id
    }));
    prompt([
      {
        type: "list",
        name: "depId",
        message: "Which department do you want to remove?",
        choices: depOptions
      }
    ])
      .then(response => db.eliminateDep(response.depId))
      .then(() => console.log("Removed department from the database"))
      .then(() => renderOptionList())
  })
}

function deleteRole() {
  console.log("\nWarning: This will also remove all associated employees");
  db.queryAllRoles()
    .then(([rows])=>{
    let role = rows;
    const roleOptions = role.map(({id,title})=>({
      name: title,
      value: id
    }));
    prompt([
      {
        type: "list",
        name: "roleId",
        message: "Which role do you want to remove?",
        choices: roleOptions
      }
    ])
      .then(response => db.removeRole(response.roleId))
      .then(() => console.log("Removed role from the database"))
      .then(() => renderOptionList())
  })
}


function quit(){
  console.log("Have a good time!");
  process.exit()
}