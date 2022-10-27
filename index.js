const express = require("express");
const path = require("path");
const app = express();
const { Pool } = require("pg");
const PORT = 4000;

//views
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
const routes = require("./controllers/routes");
app.use(express.urlencoded({ extended: false })); // <--- paramétrage du middleware

//Gestion medias
app.use(express.static("public"));

//Deffintion routes
app.use(routes);

//connexion a la base de donnees
const pool = new Pool({
  user: "dsiqfcrw",
  host: "peanut.db.elephantsql.com",
  database: "dsiqfcrw",
  password: "wmJq60NzgDASt9hYYt1FI2JAPkUWepV9",
  port: 5432,
});

const sql_create = `
CREATE TABLE IF NOT EXISTS agent (
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
const sql_insert = `INSERT INTO agent ( noms, fonction, contact,adresse) VALUES
    ( 'Abel Mbula', 'Coach', '40-940-39049', 'Goma'),
    ( 'Doddy Matabaro', 'Coach', '40-940-39049', 'Goma'),
    ( 'Shako BEnjamin', 'Coach', '40-940-39049', 'Goma')
    
  ON CONFLICT DO NOTHING;`;
pool.query(sql_insert, [], (err, result) => {
  if (err) {
    return console.error(err.message);
  }
  const sql_sequence = "SELECT SETVAL('agent_ID_Seq', MAX(ID)) FROM agent;";
  pool.query(sql_sequence, [], (err, result) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Alimentation réussie de la table 'agents'");
  });
});

app.get("/agent", (req, res) => {
  const sql = "SELECT * FROM agent ORDER BY ID ASC";
  pool.query(sql, [], (err, result) => {
    if (err) {
      return console.error(err.message);
    }
    console.log(result.rows);
    res.render("agents", { model: result.rows });
  });
});

app.get("/create", (req, res) => {
  res.render("create", { model: {} });
});

app.post("/create", (req, res) => {
  const sql =
    "INSERT INTO agent (noms, fonction,contact,adresse ) VALUES ($1, $2, $3, $4)";
  console.log(req.body);

  const book = [
    req.body.noms,
    req.body.fonction,
    req.body.contact,
    req.body.adresse,
  ];
  pool.query(sql, book, (err, result) => {
    if (err) {
      console.log(err);
      return res.redirect("/create");
    }
    res.redirect("/agent");
  });
});
// GET /edit/5
app.get("/edit/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM agent WHERE ID = $1";
  pool.query(sql, [id], (err, result) => {
    // if (err) ...
    res.render("edit", { model: result.rows[0] });
  });
});
app.post("/edit/:id", (req, res) => {
  const id = req.params.id;
  const book = [
    req.body.noms,
    req.body.fonction,
    req.body.contact,
    req.body.adresse,
    id,
  ];
  const sql =
    "UPDATE agent SET noms = $1, fonction = $2, contact = $3, adresse = $4 WHERE (ID=$5) ";
  pool.query(sql, book, (err, result) => {
    // if (err) ...

    res.redirect("/agent");
  });
});

// GET /delete/5
app.get("/delete/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM agent WHERE ID = $1";
  pool.query(sql, [id], (err, result) => {
    // if (err) ...
    res.render("delete", { model: result.rows[0] });
  });
});

// POST /delete/5
app.post("/delete/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM agent WHERE ID = $1";
  pool.query(sql, [id], (err, result) => {
    if (err) console.log(err);
    res.redirect("/agent");
  });
});




app.listen(PORT, () => {
  console.log("Serveur démarré au port : " + PORT);
});
