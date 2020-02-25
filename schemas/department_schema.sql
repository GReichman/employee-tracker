USE employeeDB;

DROP TABLE IF EXISTS departments;

CREATE TABLE departments(
    id integer auto_increment,
    name varchar(30),
    primary key(depId)
);

INSERT INTO departments(name) VALUES("sports");
INSERT INTO departments(name) VALUES("clothing");
INSERT INTO departments(name) VALUES("electronics");
