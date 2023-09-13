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
    type: "input",
    name: "employee",
    message: "Choose your roles Department:",
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
function roleAdd() {
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
          db.query("SELECT * FROM department", function (err, results) {
            console.table(results);
            mainMenu();
          });
          break;
        case "View all roles":
          db.query("SELECT * FROM role LEFT JOIN dep", function (err, results) {
            console.table(results);
            mainMenu();
          });
          break;
        case "View all employees":
          db.query("SELECT * FROM employee", function (err, results) {
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
