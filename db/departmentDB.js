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


const createDepartment = name=>{
connection.connect();

    promiseQuery(`INSERT INTO departments (name) VALUES(${name});`).then(results=>{
        console.log("department created");
    })
    connection.end();
}//createDepartment

const getDepartment = depId =>{
    connection.connect();

    let results =promiseQuery(`SELECT * FROM departments WHERE id = ${depId}`);

    connection.end();
    return results;
}

const removeDepartment = depId=>{
    connection.connect();

    promiseQuery(`DELETE FROM departments WHERE id= ${depId}`).then(results=>{
        console.log("department deleted");
    })
    connection.end();
}

const getAllDepartments= ()=>{
    connection.connect();

    let results = promiseQuery(`SELECT * FROM departments`);
    connection.end();
    return results;
}

module.exports=
    {
        getAllDepartments: getAllDepartments,
        removeDepartment: removeDepartment,
        getDepartment: getDepartment,
        createDepartment:createDepartment
    }
