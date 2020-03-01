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
        case "Update Role Title":
            changeTitle(await rol.getAllRoles());
            break;
        case "Update Role Salary":
            changeSalary(await rol.getAllRoles());
            break;
        case "Update Department Name":
            changeDepartment(await dept.getAllDepartments());
            break;
        case "View Roles By Department":
            viewAll(await rol.rolesByDepartment());
            break;
        case "View All Employees By Role":
            viewAll(await emp.employeesByRole());    
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
            "View All Employees By Role",
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
        emp.removeEmployee(getId(response.employee));
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
        dept.removeDepartment(getId(response.department));
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
        rol.removeRole(getId(response.role));
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
            emp.createEmployee(choices.first, choices.last, getId(choices.role));
        }
        else {
            emp.createEmployee(choices.first, choices.last, getId(choices.role), getId(choices.manager));
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

        rol.createRole(choices.title, choices.salary, getId(choices.department));
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
        emp.changeRole(getId(choices.employee), getId(choices.role));

        appManager();
    });
}

function changeManager(employees) {
    let empList = createEmployeeList(employees);
    let manList = empList.slice();
    manList.push("none");
    inquirer.prompt([
        {
            message: "Select which employee's manager has changed",
            name: "employee",
            type: "rawlist",
            choices: empList
        },
        {
            message: "Select their new manager",
            name: "manager",
            type: "rawlist",
            choices: manList
        }
    ]).then(choices => {

        let empid = getId(choices.employee);
        let manid = getId(choices.manager);

        if (choices.manager == "none" || empid == manid) {
            emp.changeManager(empid, null);
        } else {
            emp.changeManager(empid, manid);
        }
        appManager();
    })
}

function changeTitle(roles) {
    let roleList = createRoleList(roles);

    inquirer.prompt([
        {
            message: "Select the title to change",
            name: "oldTitle",
            type: "rawlist",
            choices: roleList
        },
        {
            message: "Enter the new title",
            name: "newTitle",
            type: "input",
        }
    ]).then(choices => {
        rol.changeTitle(getId(choices.oldTitle), choices.newTitle);
        appManager();
    })
}

function changeSalary(roles) {
    let roleList = createRoleList(roles);

    inquirer.prompt([
        {
            message: "Select the role whose salary youd like to change",
            name: "oldSalary",
            type: "rawlist",
            choices: roleList
        },
        {
            message: "Enter the new salary",
            name: "newSalary",
            type: "input",
            validate: function (input) {
                if (isNaN(input)) {
                    return "must be a number";
                }
                else {
                    return true;
                }
            }
        }
    ]).then(choices => {
        rol.changeSalary(getId(choices.oldSalary), choices.newSalary);
        appManager();
    })
}

function changeDepartment(departments){
    let deptList = createDepartmentList(departments);

    inquirer.prompt([
        {
            message:"Select which department you wish to change",
            type:"rawlist",
            choices:deptList,
            name:"department"
        },
        {
            message:"Enter new department name",
            type:"input",
            name:"newName"
        }
    ]).then(choices=>{
        dept.changeName(getId(choices.department),choices.newName);
        appManager();
    })
}

function endApp() {
    console.log("Goodbye");
    emp.endConnection();
    rol.endConnection();
    dept.endConnection();
}


function getId(str) {
    return str.slice(0, str.indexOf('.'));
}



