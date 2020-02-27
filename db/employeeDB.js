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


const createEmployee = (first,last,roleId,managerId)=>{

    if(managerId== undefined){
        console.log("no manager provided");
        managerId=null;
    }
connection.connect();

    promiseQuery(`INSERT INTO employees (first_name,last_name,roleId,managerId) VALUES("${first}","${last}",${roleId},${managerId});`).then(results=>{
        console.log("employees created");
    })
    connection.end();
}//createDepartment

const getEmployee = empId =>{
    connection.connect();

    let results =promiseQuery(`SELECT * FROM employees WHERE id = ${empId}`);

    connection.end();
    return results;
}

const removeEmployee = empId=>{
    connection.connect();

    promiseQuery(`DELETE FROM employees WHERE id= ${empId}`).then(results=>{
        console.log("employee deleted");
    })
    connection.end();
}

const getAllEmployees= ()=>{
    connection.connect();

    let results = promiseQuery(`SELECT * FROM employees`);
    connection.end();
    return results;
}

const getByManager= (manId)=>{
    connection.connect();

    let results = promiseQuery(`SELECT * FROM employees WHERE managerId = ${manId}`);
    connection.end();
    return results;
}

const getByDepartment = (depId)=>{
    connection.connect();

    let results = promiseQuery(`SELECT * FROM employees WHERE managerId = ${manId}`);
    connection.end();
    return results;

}

let nums = "1,2";
connection.connect();
promiseQuery(`SELECT * FROM employees WHERE roleId IN (${nums})`
    ).then(results=>{
    console.table(results);
    connection.end();
})

// connection.query(`SELECT * FROM employees WHERE roleId IN ?`,(1,2),(err,results)=>{
//     if(err) throw err;
//     console.log(results);
//     connection.end();
// })

module.exports=
    {
        getAllEmployees: getAllEmployees,
        removeEmployee: removeEmployee,
        getEmployee: getEmployee,
        createEmployee:createEmployee
    }
