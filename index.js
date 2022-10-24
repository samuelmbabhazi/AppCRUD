const Express = require('express');
const path = require("path");
const app = Express();
const PORT = 4000 ;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.listen(4000, () => {
    console.log("Serveur démarré au port : " + PORT);
  });