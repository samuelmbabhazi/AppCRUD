const express = require('express')
const router = express.Router()


// accueil route
router.get("/", (req, res) => {
    res.render(`index`);
});
router.get("/accueil", (req, res) => {
    res.render(`index`);
  });

//about
router.get("/about", (req, res) => {
  res.render(`about`);
});

//data
router.get("/data", (req, res) => {
  res.render(`data`);
});


//livres
router.get("/livres", (req, res) => {
  res.render(`livres`);
});



module.exports = router;