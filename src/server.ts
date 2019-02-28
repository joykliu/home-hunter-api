import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import loadEnv from "./utils/loadEnv";
import loadEnvVars from "./utils/loadEnvVars";
import routes from "./routes";

loadEnvVars();

const port = loadEnv("PORT");
const app = express();
const corsMiddleware = cors({ origin: loadEnv("CORS_ORIGIN") });

app
  .use(corsMiddleware)
  .use(bodyParser.json())
  .use(
    bodyParser.urlencoded({
      extended: true
    })
  )
  .use("/", routes);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

module.exports = app;
