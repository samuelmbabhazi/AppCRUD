const Express = require('express');
const path = require("path");
const app = Express();
const { Pool } = require("pg");
const PORT = 40001 ;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res, next) => {
  res.render("index");
});

//connexion a la base de donnees
const pool = new Pool({
  user: "dsiqfcrw",
  host: "peanut.db.elephantsql.com",
  database: "dsiqfcrw",
  password: 'wmJq60NzgDASt9hYYt1FI2JAPkUWepV9',
  port: 5432
});

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

  // Alimentation de la table
  const sql_insert = `INSERT INTO agent (ID, noms, fonction, contact,adresse) VALUES
    (1, 'Abel Mbula', 'Coach', '40-940-39049', 'Goma'),
    (2, 'Doddy Matabaro', 'Coach', '40-940-39049', 'Goma'),
    (3, 'Shako BEnjamin', 'Coach', '40-940-39049', 'Goma')
    
  ON CONFLICT DO NOTHING;`;
  pool.query(sql_insert, [], (err, result) => {
    if (err) {
      return console.error(err.message);
    }
      console.log("Alimentation réussie de la table 'agent'");
  });

  app.get("/agent", (req, res) => {
    const sql = "SELECT * FROM agent";
    pool.query(sql, [], (err, result) => {
      if (err) {
        return console.error(err.message);
      }
      console.log(result.rows)
      res.render("agents", { model: result.rows });
    });
  });

app.listen(PORT, () => {
    console.log("Serveur démarré au port : " + PORT);
  });