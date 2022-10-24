const Express = require('express');
const app = Express();
const PORT = 4000 ;


app.listen(4000, () => {
    console.log("Serveur démarré au port :" + PORT);
  });