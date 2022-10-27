const { Pool } = require('pg');

const dotenv = require('dotenv');
dotenv.config();
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
  
module.exports = pool;
  