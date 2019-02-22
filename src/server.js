require("./utils/loadEnvVars")();

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const loadEnv = require("./utils/loadEnv");
const db = require("./queries");

const port = loadEnv("PORT");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);


app.get('/', (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" })
})

app.get('/homes', db.getHomes);
app.get('/homes/:id', db.getHomeById);
app.post('/homes', db.createHome);
app.put('/homes/:id', db.updateHome);
app.delete('/homes/:id', db.deleteHome);

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
