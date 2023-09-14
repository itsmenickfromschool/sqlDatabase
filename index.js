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
  db.query("SELECT department.name AS department FROM department"), ( err, results) => {
    if (err) throw err;

    const departmentChoices = results.map(row => row.department);

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
        name: "department",
        message: "Choose your roles Department:",
        choices: departmentChoices 
      }
    ];

    prompt(roleQuestion).then((data) => {
      console.log(data);
      const sql = `INSERT INTO department (name) VALUES (?)`;
      const params = [data.name];
      db.query(sql, params, (err, result) => {
        if (err) throw err;
      });
      mainMenu();
    });
  }
}

function employeeAdd() {
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
          // mainMenu();
          break;
        case "Add a role":
          break;
        case "Update an employee role":
          break;
        case "Quit":
          process.exit();
      }
    })
    .then();
}

mainMenu();
