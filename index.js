const Express = require('express');
const app = Express();
const PORT = 4000 ;

app.set("view engine", "ejs");

app.listen(4000, () => {
    console.log("Serveur démarré au port : 4000!");
  });