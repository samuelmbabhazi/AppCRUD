const express = require('express')
// const router = express.Router()
const img = "../public/images/image_fond.png";

const { getData, getAddData, postAddData, getEditData, postEditData,  postDeleteData ,getDeleteData } = require('./data.controller');
const router = require('express').Router();

router.get('/agent', getData);
router.get('/create', getAddData);
router.post('/create', postAddData);
router.get('/edit/:id', getEditData);
router.post('/edit/:id', postEditData);
router.get('/delete/:id', getDeleteData);
router.post('/delete/:id', postDeleteData);

// accueil route
router.get("/", (req, res) => {
  res.render(`index`, {image:img});
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


