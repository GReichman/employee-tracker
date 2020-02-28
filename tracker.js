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
    case "Remove Employee":
        removeEmployee(await emp.getAllEmployees());
        break;
    case "Remove Department":
        removeDepartment(await dept.getAllDepartments());
        break;
    case "Remove Role":
        removeRole(await rol.getAllRoles());
        break;
    case "Quit":
        endApp();
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
            "Update Department Name",
            "Quit"
        ]
    })
}

function viewAll(results){
console.table(results);
appManager();
}

function removeEmployee(results){
    let list = createEmployeeList(results);

    inquirer.prompt({
        name:"employee",
        message:"Who would you like to remove?",
        type:"rawlist",
        choices:list
    }).then(response =>{
        emp.removeEmployee(response.employee.charAt(0));
        appManager();
    });
    
  
}//remove employee

function removeDepartment(results){
    let list = createDepartmentList(results);

    inquirer.prompt({
        name:"department",
        message:"Which department would you like to remove?",
        type:"rawlist",
        choices:list
    }).then(response =>{
        dept.removeDepartment(response.department.charAt(0));
        appManager();
    });
}//remove department

function removeRole(results){
    let list = createRoleList(results);

    inquirer.prompt({
        name:"role",
        message:"Which role would you like to remove?",
        type:"rawlist",
        choices:list
    }).then(response =>{
        rol.removeRole(response.role.charAt(0));
        appManager();
    });
}//remove department

function createEmployeeList(results){
return results.map(element=>{return `${element.id}. ${element.first_name} ${element.last_name}`});
}

function createDepartmentList(results){
    return results.map(element=>{return `${element.id}. ${element.name}`});

}

function createRoleList(results){
    return results.map(element=>{return `${element.id}. ${element.title}`});

}

function endApp(){
    console.log("Goodbye");
    emp.endConnection();
    rol.endConnection();
    dept.endConnection();
}


