const dept = require("./db/departmentDB");


begin();
async function begin(){
let departments= await dept.getAllDepartments();
console.log(departments);

}