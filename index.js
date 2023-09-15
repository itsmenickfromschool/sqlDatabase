const inquirer = require("inquirer");
const mysql2 = require("mysql2");
// require("console.table");

const prompt = inquirer.createPromptModule();
const menu = [
  {
    type: "list",
    name: "options",
    message: "Hello, What would you like to do?",
    choices: [
      "View all departments",
      "View all roles",
      "View all employees",
      "Add a department",
      "Add a role",
      "Add an employee",
      "Update an employee role",
      "Quit",
    ],
  },
];
const departmentQuestion = [
  {
    type: "input",
    name: "department",
    message: "Input your department name:",
  },
];


const db = mysql2.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "guac",
  database: "employeeDB",
});
db.connect((err) => {
  if (err) throw err;
  console.log("connected!");
});

// db.query(queryString, function (err, results) {
//   // console.log(results);
// });
function departmentFunction() {
  prompt(departmentQuestion).then((data) => {
    console.log(data);
    const sql = `INSERT INTO department (name) VALUES (?)`;
    const params = [data.department];
    db.query(sql, params, (err, result) => {
      if (err) throw err;
    });
    mainMenu();
  });
}

function roleAdd() {
  db.query("SELECT department.id, department.name AS department FROM department", ( err, results) => {
    if (err) throw err;

    const departmentChoices = results.map(row => {
      return {
        name: row.department,
        value: row.id
      };
    });

    const roleQuestion = [
      {
        type: "input",
        name: "name",
        message: "Input your role name:",
      },
      {
        type: "input",
        name: "salary",
        message: "Input the roles salary:",
      },
      {
        type: "list", 
        name: "department_id",
        message: "Choose your roles Department:",
        choices: departmentChoices 
      }
    ];

    prompt(roleQuestion).then((data) => {
      const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`
      const params = [data.name, data.salary, data.department_id]
      db.query(sql, params, (err, result) => {
        if (err) throw err;
      });
      mainMenu();
    });
  }
)}

function employeeAdd() {
  db.query("SELECT employee.manager_id, role.title, role.id, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee INNER JOIN role ON employee.role_id = role.id LEFT JOIN employee AS manager ON employee.manager_id = manager.id", ( err, results) => {

    const roleChoices = results.map(row => {
      return {
        name: row.title,
        value: row.id
      };
    });

    const managerChoices = results.map(row => {
      return {
        name: row.manager,
        value: row.manager_id
      };
    });

    const employeeQuestions = [
      {
        type: "input",
        name: "first_name",
        message: "Input your employee's fisrt name:",
      },
      {
        type: "input",
        name: "last_name",
        message: "Input your employee's last name",
      },
      {
        type: "list",
        name: "role_id",
        message: "Choose your employee's role:",
        choices: roleChoices
      },
      {
        type: "list", 
        name: "manager_id",
        message: "Choose your employee's Manager:",
        choices: managerChoices
      }
    ];


    prompt(employeeQuestions).then((data) => {
      const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
      const params = [data.first_name, data.last_name, data.role_id, data.manager_id];
      db.query(sql, params, (err, result) => {
        if (err) throw err;
      });
      mainMenu();
    });
  })
}

function mainMenu() {
  prompt(menu)
    .then((selection) => {
      const { options } = selection;
      switch (options) {
        case "View all departments":
          db.query("SELECT department.name AS Department, department.id as ID FROM department", function (err, results) {
            console.table(results);
            mainMenu();
          });
          break;
        case "View all roles":
          db.query("SELECT role.title AS `Job Title`, department.name AS Department, role.salary AS salary FROM role INNER JOIN department ON role.department_id = department.id", function (err, results) {
            console.table(results);
            mainMenu();
          });
          break;
        case "View all employees":
          db.query("SELECT employee.id AS 'Employee ID', employee.first_name AS 'First Name', employee.last_name AS 'Last Name', role.title AS 'Job Title', department.name AS 'Department', role.salary AS 'Salary', CONCAT(manager.first_name, ' ', manager.last_name) AS 'Manager Name' FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id LEFT JOIN employee AS manager ON employee.manager_id = manager.id"
          , function (err, results) {
            console.table(results);
            mainMenu();
          });
          break;
        case "Add a department":
          departmentFunction();
          break;
        case "Add a role":
          roleAdd();
          break;
        case "Add an employee":
          employeeAdd();
          break;
        case "Update an employee role":
          break;
        case "Quit":
          process.exit();
      }
    })
}

mainMenu();
