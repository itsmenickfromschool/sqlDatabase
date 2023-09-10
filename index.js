const inquirer =require('inquirer')
const mysql2 = require('mysql2')

const db = mysql2.createConnection(
    {
      host: '127.0.0.1',
      user: 'root',
      
      password: 'guac',
      database: 'employeeDB'
    },
)
db.connect((err) => {if (err) throw err
console.log('conneted!')})

db.query('SELECT * FROM employee JOIN role ON employee.role_id = role.id', function(err, results){
  console.log(results);
})