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


const createRole = (title,salary,depId)=>{
connection.connect();

    promiseQuery(`INSERT INTO roles (title,salary,depId) VALUES(${title},${salary},${depId});`).then(results=>{
        console.log("role created");
    })
    connection.end();
}//createDepartment

const getRole = roleId =>{
    connection.connect();

    let results =promiseQuery(`SELECT * FROM roles WHERE id = ${roleId}`);

    connection.end();
    return results;
}

const removeRole = roleId=>{
    connection.connect();

    promiseQuery(`DELETE FROM roles WHERE id= ${roleId}`).then(results=>{
        console.log("role deleted");
    })
    connection.end();
}