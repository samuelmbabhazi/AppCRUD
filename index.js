const Express = require('express');
const app = Express();
const { Pool } = require("pg");
const PORT = 4000 ;

const pool = new Pool({
  user: "dsiqfcrw ",
  host: "peanut.db.elephantsql.com",
  database: "dsiqfcrw",
  password: "wmJq60NzgDASt9hYYt1FI2JAPkUWepV9",
  port: 5432
});

console.log("Connexion réussie à la base de données");

app.listen(4000, () => {
    console.log("Serveur démarré au port : 4000!");
  });