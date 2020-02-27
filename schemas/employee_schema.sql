USE employeeDB;

DROP TABLE IF EXISTS employees;

CREATE TABLE employees(
    id integer auto_increment,
    first_name varchar(30),
    last_name varchar(30),
    roleId integer,
    managerId integer,
    primary key(id),
    foreign key(roleId) REFERENCES roles(id),
    foreign key(managerId) REFERENCES employees(id)
);

INSERT INTO employees (first_name, last_name,roleId) VALUES("garrett","reichman",3);
INSERT INTO employees (first_name, last_name,roleId,managerId) VALUES("tom","hanks",2,1);
INSERT INTO employees (first_name, last_name,roleId, managerId) VALUES("nic","cage",1,2);