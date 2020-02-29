const mysql = require("mysql");
const ctable = require("console.table");
const util = require("util");

let connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"1g9s9r5",
    database:"employeeDB"
    
});
const promiseQuery = util.promisify(connection.query).bind(connection);

connection.connect();

const createEmployee = (first,last,roleId,managerId)=>{

    if(managerId== undefined){
        console.log("no manager provided");
        managerId=null;
    }


    promiseQuery(`INSERT INTO employees (first_name,last_name,roleId,managerId) VALUES("${first}","${last}",${roleId},${managerId});`).then(results=>{
        console.log("employees created");
    })
}//createDepartment

const getEmployee = empId =>{
    

    let results =promiseQuery(`SELECT * FROM employees WHERE id = ${empId}`);

    return results;
}

const removeEmployee = empId=>{
   
   
    promiseQuery(`DELETE FROM employees WHERE id= ${empId}`).then(results=>{
        
        console.log("employee deleted");
    });
}

const getAllEmployees= ()=>{


    let results = promiseQuery(`SELECT * FROM employees`);
    return results;
}

const changeRole=(id,roleId)=>{

    promiseQuery("UPDATE employees SET roleId=? WHERE id=?",[roleId,id]);

}

const changeManager= (id,manId)=>{
    promiseQuery("UPDATE employees SET managerId=? WHERE id=?",[manId,id]);
}


const getByManager= (manId)=>{
  

    let results = promiseQuery(`SELECT * FROM employees WHERE managerId = ${manId}`);
    return results;
}

const getByDepartment = (depId)=>{
 

    let results = promiseQuery(`SELECT * FROM employees WHERE managerId = ${manId}`);
    return results;

}

const endConnection=() =>{
    connection.end();
}

// let nums = "1,2";
// connection.connect();
// promiseQuery(`SELECT * FROM employees WHERE roleId IN (${nums})`
//     ).then(results=>{
//     console.table(results);
//     connection.end();
// })

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
        createEmployee:createEmployee,
        endConnection:endConnection,
        changeRole:changeRole,
        changeManager:changeManager
    }
