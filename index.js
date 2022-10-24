const Express = require("express");
const path = require("path");
const app = Express();

const PORT = 4001;

const { Pool } = require("pg");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
const routes = require('./controllers/routes')


app.get("/", (req, res) => {
  res.send("Bonjour le monde...");
  res.render("index");
});

//connexion a la base de donnees
const pool = new Pool({
  user: "dsiqfcrw ",
  host: "peanut.db.elephantsql.com",
  database: "dsiqfcrw",
  password: "wmJq60NzgDASt9hYYt1FI2JAPkUWepV9",
  port: PORT,
});


app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));

console.log("Connexion réussie à la base de données");

const sql_create = `CREATE TABLE IF NOT EXISTS agent (
  ID SERIAL PRIMARY KEY,
  noms VARCHAR(100) NOT NULL,
  fonction VARCHAR(100) NOT NULL,
  contact VARCHAR(100) NOT NULL,
  adresse VARCHAR(100) NOT NULL
);`;

pool.query(sql_create, [], (err, result) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Création réussie de la table 'agents'");
});
app.listen(4000, () => {
    console.log("Serveur démarré au port : " + PORT);
  });