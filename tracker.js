const dept = require("./db/departmentDB");
const rol = require("./db/roleDB");
const emp = require("./db/employeeDB");
const inquirer = require("inquirer");
const ctab = require("console.table");

appManager();
async function appManager() {
    let option = await displayOptions();


    switch (option.choice) {
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
        case "Add Employee":
            addEmployee(await rol.getAllRoles(), await emp.getAllEmployees());
            break;
        case "Add Role":
            addRole(await dept.getAllDepartments());
            break;
        case "Add Department":
            addDepartment();
            break;
        case "Update Employee Role":
            changeRole(await rol.getAllRoles(), await emp.getAllEmployees());
            break;
        case "Update Employee Manager":
            changeManager(await emp.getAllEmployees());
            break;
        case "Quit":
            endApp();
            break;
    }



}

function displayOptions() {
    return inquirer.prompt({
        name: "choice",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "View All Employees By Department",
            "View All Employees By Manager",
            "Add Employee",
            "Remove Employee",
            "Update Employee Role",
            "Update Employee Manager",
            "View All Roles",
            "View Roles By Department",
            "Add Role",
            "Remove Role",
            "Update Role Title",
            "Update Role Salary",
            "View All Departments",
            "Add Department",
            "Remove Department",
            "Update Department Name",
            "Quit"
        ]
    })
}

function viewAll(results) {
    console.table(results);
    appManager();
}

function removeEmployee(results) {
    let list = createEmployeeList(results);

    inquirer.prompt({
        name: "employee",
        message: "Who would you like to remove?",
        type: "rawlist",
        choices: list
    }).then(response => {
        emp.removeEmployee(response.employee.charAt(0));
        appManager();
    });


}//remove employee

function removeDepartment(results) {
    let list = createDepartmentList(results);

    inquirer.prompt({
        name: "department",
        message: "Which department would you like to remove?",
        type: "rawlist",
        choices: list
    }).then(response => {
        dept.removeDepartment(response.department.charAt(0));
        appManager();
    });
}//remove department

function removeRole(results) {
    let list = createRoleList(results);

    inquirer.prompt({
        name: "role",
        message: "Which role would you like to remove?",
        type: "rawlist",
        choices: list
    }).then(response => {
        rol.removeRole(response.role.charAt(0));
        appManager();
    });
}//remove department

function createEmployeeList(results) {
    return results.map(element => { return `${element.id}. ${element.first_name} ${element.last_name}` });
}

function createDepartmentList(results) {
    return results.map(element => { return `${element.id}. ${element.name}` });

}

function createRoleList(results) {
    return results.map(element => { return `${element.id}. ${element.title}` });

}

function addEmployee(roles, employees) {
    let roleList = createRoleList(roles);
    let empList = createEmployeeList(employees);
    empList.push("none");
    inquirer.prompt([
        {
            message: "Enter First name",
            type: "input",
            name: "first"
        },
        {
            message: "Enter Last Name",
            type: "input",
            name: "last"
        },
        {
            message: "Select Role",
            type: "rawlist",
            choices: roleList,
            name: "role"
        },
        {
            message: "Select Manager",
            type: "rawlist",
            choices: empList,
            name: "manager"
        }
    ]).then(choices => {
        if (choices.manager == "none") {
            emp.createEmployee(choices.first, choices.last, choices.role.charAt(0));
        }
        else {
            emp.createEmployee(choices.first, choices.last, choices.role.charAt(0), choices.manager.charAt(0));
        }
        appManager();
    })
}//addEmployee

function addRole(departments) {
    let departmentList = createDepartmentList(departments);

    inquirer.prompt([
        {
            message: "Enter Role Title",
            type: "input",
            name: "title"
        },
        {
            message: "Enter Salary",
            type: "input",
            name: "salary",
            validate: function (input) {
                if (isNaN(input)) {

                    return "must be a number";
                }
                else {
                    return true;
                }
            }
        }, {
            message: "Select Department",
            type: "rawlist",
            name: "department",
            choices: departmentList
        }
    ]).then(choices => {

        rol.createRole(choices.title, choices.salary, choices.department.charAt(0));
        appManager();
    });
}//addRole

function addDepartment() {
    inquirer.prompt({
        message: "Enter Department Name",
        type: "input",
        name: "department"
    }).then(choice => {
        dept.createDepartment(choice.department);
        appManager();
    })

}

function changeRole(roles, employees) {
    let empList = createEmployeeList(employees);
    let roleList = createRoleList(roles);

    inquirer.prompt([{
        message: "Select which employee you would like to change",
        name: "employee",
        type: "rawlist",
        choices: empList
    },
    {
        message: "Select their new role",
        name: "role",
        type: "rawlist",
        choices: roleList
    }]).then(choices => {
        console.log(`${choices.employee.charAt(0)} ${choices.employee} changes to ${choices.role}`);
        emp.changeRole(choices.employee.charAt(0), choices.role.charAt(0));

        appManager();
    });
}

function changeManager(employees) {
    let empList = createEmployeeList(employees);
    let manList = empList.slice();
    manList.push("none");
    inquirer.prompt([
        {
            message:"Select which employee's manager has changed",
            name:"employee",
            type:"rawlist",
            choices:empList
        },
        {
            message:"Select their new manager",
            name:"manager",
            type:"rawlist",
            choices:manList
        }
    ]).then(choices=>{

        let empid=choices.employee.charAt(0);
        let manid=choices.manager.charAt(0);

        if(choices.manager=="none" || empid==manid){
            emp.changeManager(empid,null);
        }else{
            emp.changeManager(empid,manid);
        }
        appManager();
    })
}

function endApp() {
    console.log("Goodbye");
    emp.endConnection();
    rol.endConnection();
    dept.endConnection();
}


