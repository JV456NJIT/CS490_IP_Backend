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
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
})

db.connect();

app.get('/', (re, res) =>{
  return res.json("Connection Established");
})

app.get('/top_films', (req, res) => {
  db.query(process.env.TOP_FIVE_FILMS, (err, data, fields)=> {
    if(err) return res.json(err);
    return res.json(data);
  })
})

app.get('/top_actors', (req, res) => {
  db.query(process.env.TOP_FIVE_ACTORS, (err, data, fields)=> {
    if(err) return res.json(err);
    return res.json(data);
  })
})

app.get('/film/:title', (req, res) => {
  db.query(process.env.FILM_DESCRIPTION, [req.params.title], (err, data, fields)=> {
    if(err) return res.json(err);
    return res.json(data);
  })
})

app.get('/actor/:actor', (req, res) => {
  db.query(process.env.ACTOR_TOP_FILMS, [req.params.actor], (err, data, fields)=> {
    if(err) return res.json(err);
    return res.json(data);
  })
})

app.get('/films/:title&:actorFirst&:actorLast&:genre', (req, res) => {
  if(req.params.title=='null') req.params.title="%";
  if(req.params.actorFirst=='null') req.params.actorFirst="%";
  if(req.params.actorLast=='null') req.params.actorLast="%";
  if(req.params.genre=='null') req.params.genre="%";
  console.log(req.params);
  db.query(process.env.FILM_SEARCH, ["%" + req.params.title + "%", "%" + req.params.actorFirst + "%", 
                                      "%" + req.params.actorLast + "%", "%" + req.params.genre + "%"],(err, data, fields)=> {
    if(err) return res.json(err);
    return res.json(data);
  });
})

app.listen(8000, () => {
      console.log('server listening on port 8000')
});
