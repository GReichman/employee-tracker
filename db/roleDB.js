const mysql = require("mysql");
const ctable = require("console.table");
const util = require("util");

const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"1g9s9r5",
    database:"employeeDB"
    
});
const promiseQuery = util.promisify(connection.query).bind(connection);

connection.connect();

const createRole = (title,salary,depId)=>{
    promiseQuery(`INSERT INTO roles (title,salary,depId) VALUES("${title}",${salary},${depId});`).then(results=>{
        console.log("role created");
    })
}//createDepartment

const getRole = roleId =>{

    let role=  promiseQuery(`SELECT * FROM roles WHERE id = ${roleId}`);

    return role;
}

const removeRole = roleId=>{

    promiseQuery(`DELETE FROM roles WHERE id= ${roleId}`).then(results=>{
        console.log("role deleted");
    })
}

const getAllRoles= ()=>{
    

    let results = promiseQuery(`SELECT * FROM roles`);
    return results;
}

const changeTitle = (id,newTitle)=>{
    promiseQuery(`UPDATE roles SET title=? WHERE id=?`,[newTitle,id]);
}

const changeSalary = (id,newSalary)=>{
    promiseQuery(`UPDATE roles SET salary=? WHERE id=?`,[newSalary,id]);
}

const rolesByDepartment = () =>{
    return promiseQuery(`SELECT roles.title, departments.name FROM roles, departments WHERE roles.depId = departments.id`);
}

const endConnection=() =>{
    connection.end();
}

module.exports=
    {
        getAllRoles: getAllRoles,
        removeRole: removeRole,
        getRole: getRole,
        createRole:createRole,
        endConnection:endConnection,
        changeTitle:changeTitle,
        changeSalary:changeSalary,
        rolesByDepartment:rolesByDepartment
    }

 