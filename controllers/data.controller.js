const pool = require('../config/db');

exports.getData = (req, res, next) => {
  const sql = "SELECT * FROM agent ORDER BY ID ASC";
  pool.query(sql, [], (err, result) => {
    if (err) {
      return console.error(err.message);
    }
    console.log(result.rows);
    res.render("agents", { model: result.rows });
  });

};

//add data
exports.getAddData = (req, res, next) => {
    res.render("create", { model: {} });

};

exports.postAddData = (req, res, next) => {
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
};


//eddit data for

exports.getEditData = (req, res, next) => {

    const id = req.params.id;
    const sql = "SELECT * FROM agent WHERE ID = $1";
    pool.query(sql, [id], (err, result) => {
      // if (err) ...
      res.render("edit", { model: result.rows[0] });
    });
}

exports.postEditData = (req, res, next) =>{
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
}

//delete data
exports.getDeleteData = (req, res) => {

    const id = req.params.id;
    const sql = "SELECT * FROM agent WHERE ID = $1";
    pool.query(sql, [id], (err, result) => {
      // if (err) ...
      res.render("delete", { model: result.rows[0] });
    });
}

exports.postDeleteData = (req, res, next) => {
    const id = req.params.id;
    const sql = "DELETE FROM agent WHERE ID = $1";
    pool.query(sql, [id], (err, result) => {
      if (err) console.log(err);
      res.redirect("/agent");
    });
}

