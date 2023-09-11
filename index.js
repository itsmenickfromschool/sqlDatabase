const inquirer = require("inquirer");
const mysql2 = require("mysql2");
require("console.table");
const queryString = `
SELECT e.id, e.first_name, e.last_name, r.title, r.salary, 
       d.name AS department, m.first_name AS manager_first, m.last_name AS manager_last
FROM employee e
JOIN role r ON e.role_id = r.id
JOIN department d ON r.department_id = d.id
LEFT JOIN employee m ON e.manager_id = m.id;
`;

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
      "Update an employee roll",
    ],
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

prompt(menu).then((selection) => {
  const { options } = selection;
  if (options === "View all departments") {
    db.query("SELECT * FROM department", function (err, results) {
      console.table(results);
    });
  }
  if (options === "View all employees") {
    console.log(options);
  }
  if (options === "View all roles") {
    console.log(options);
  }
  if (options === "Add a department") {
    console.log(options);
  }
  if (options === "Add a role") {
    console.log(options);
  }
  if (options === "Add an employee") {
    console.log(options);
  }
  if (options === "Update an employee roll") {
    console.log(options);
  }
});
