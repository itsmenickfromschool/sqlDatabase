DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE employeeDB;
USE employeeDB;
CREATE TABLE department (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL
);
CREATE TABLE role (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(45) NOT NULL,
    salary DECIMAL(10,2),
    department_id INT,
    CONSTRAINT departmentFK FOREIGN KEY(department_id) REFERENCES department(id)
);

CREATE TABLE employee (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    CONSTRAINT roleFK FOREIGN KEY(role_id) REFERENCES role(id),
    manager_id INT,
    CONSTRAINT managerFK FOREIGN KEY(manager_id) REFERENCES employee(id) ON DELETE SET NULL
);