const dept = require("./db/departmentDB");
const rol = require("./db/roleDB");
const emp = require("./db/employeeDB");
const inquirer = require("inquirer");
const ctab = require("console.table");

appManager();
async function appManager(){
let option= await displayOptions();


switch(option.choice){
    case "View All Employees":
        viewAll(await emp.getAllEmployees());
        break;
    case "View All Roles":
        viewAll(await rol.getAllRoles());
        break;
    case "View All Departments":
        viewAll(await dept.getAllDepartments());
        break;
}



}

function displayOptions(){
    return inquirer.prompt({
        name:"choice",
        type:"rawlist",
        message:"What would you like to do?",
        choices:[
            "View All Employees",
            "View All Employees By Department",
            "View All Employees By Manager",
            "Add Employee",
            "Remove Employee",
            "Update Employee Role",
            "Update Employee Manager",
            "View All Roles",
            "View Roles By Department",
            "Remove Role",
            "Update Role Title",
            "Update Role Salary",
            "View All Departments",
            "Remove Department",
            "Update Department Name"
        ]
    })
}

function viewAll(results){
console.table(results);
}

