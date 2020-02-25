USE employeeDB;

DROP TABLE IF EXISTS roles;

CREATE TABLE roles(
    id integer auto_increment,
    title varchar(30),
    salary decimal(15,2),
    depId integer,
    primary key(id),
    foreign key(depId) REFERENCES departments(id)
);

INSERT INTO roles(title, salary, depId) VALUES("Manager",32000.00,1);
INSERT INTO roles(title, salary, depId) VALUES("Manager",28000.00,2);
INSERT INTO roles(title, salary, depId) VALUES("Manager",30000.00,3);