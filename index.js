const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();
app.use(cors());
console.log(process.env);

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME
})

db.connect();

app.get('/', (re, res) =>{
  return res.json("Connection Established");
})

app.get('/topfive', (req, res) => {
  db.query(process.env.TOP_FIVE, (err, data, fields)=> {
    if(err) return res.json(err);
    return res.json(data);
  })
})

app.listen(8000, () => {
      console.log('server listening on port 8000')
});
