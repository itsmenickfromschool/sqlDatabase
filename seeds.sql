-- Seeding departments
USE employeeDB;

INSERT INTO department (name)
VALUES ("Ski Instruction"),
       ("Resort Management"),
       ("Lift Operations"),
       ("Maintenance"),
       ("Customer Service");

-- Seeding roles
INSERT INTO role (title, salary, department_id) 
VALUES ("Ski Instructor", 50000, 1),
       ("Ski Instructor Lead", 70000, 1),
       ("Resort Manager", 90000, 2),
       ("Lift Operator", 30000, 3),
       ("Head Technician", 60000, 4),
       ("Technician", 40000, 4),
       ("Customer Service Rep", 35000, 5);

-- Seeding employees (Managers first)

-- Resort Manager
INSERT INTO employee (first_name, last_name, role_id) 
VALUES ("John", "Doe", 3);

-- Ski Instruction Head
INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ("Jane", "Smith", 2, 1);

-- Maintenance Head
INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ("Robert", "Brown", 5, 1);

-- Subordinates

-- Ski Instructors
INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ("Alice", "White", 1, 2),
       ("Charlie", "Green", 1, 2),
       ("Henry", "Wallace", 1, 2),
       ("Danielle", "Turner", 1, 2),
       ("Frank", "Thompson", 1, 2);

-- Lift Operators
INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ("Eve", "Black", 4, 5),
       ("Dave", "Martinez", 4, 5),
       ("Sarah", "Morris", 4, 5),
       ("Victor", "Gomez", 4, 5);

-- Maintenance Technicians
INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ("Oliver", "Clark", 6, 5),
       ("Sophia", "Wong", 6, 5),
       ("Grace", "Mitchell", 6, 5);

-- Customer Service Representatives
INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ("Ella", "Johnson", 7, 3),
       ("Lucas", "Rodriguez", 7, 3),
       ("Megan", "Carter", 7, 3),
       ("Zachary", "Reyes", 7, 3);
