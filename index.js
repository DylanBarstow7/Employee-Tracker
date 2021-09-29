import inquirer from 'inquirer';
import db from "./db";

// this function will hold the content displayed on screen
function renderOptionList() {
    inquirer.prompt(
        [{
            type: "list",
            name: "option",
            message: "Please select from the following:/n",
            Options: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"],
        },
        ]
    )



}