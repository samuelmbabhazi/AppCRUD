const express = require("express");
const path = require("path");
const app = express();
const PORT = 4000;

//Deffintion routes
const routes = require("./routes/routes");
app.use(express.urlencoded({ extended: false })); // <--- paramétrage du middleware
app.use(routes);

//Gestion medias
app.use(express.static("public"));

//views
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.listen(PORT, () => {
  console.log("Serveur démarré au port : " + PORT);
});
