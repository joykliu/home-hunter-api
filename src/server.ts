import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import routes from "./routes";
import loadEnv from "./utils/loadEnv";
import loadEnvVars from "./utils/loadEnvVars";

loadEnvVars();

const port = loadEnv("PORT");
const app = express();
const corsMiddleware = cors({ origin: loadEnv("CORS_ORIGIN") });

app.set("port", port || 8080);

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
  // tslint:disable-next-line:no-console
  console.log(`App running on port ${port}.`);
});

module.exports = app;
