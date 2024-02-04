const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();

console.log(process.env);

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME
})

connection.connect();

connection.query('select category.name, COUNT(*) from category, film_category where film_category.category_id=category.category_id group by category.name;', (err, data, fields) => {
  if (err) throw err

  console.log(data);
});

connection.end();


app.get('/', (req, res) => {
    res.send('Hello from our server!')
});

app.listen(8080, () => {
      console.log('server listening on port 8080')
});
