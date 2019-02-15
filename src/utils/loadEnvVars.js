const fs = require("fs");
const dotenv = require("dotenv");

function override(envObj) {
  process.env = { ...process.env, ...envObj };
}

function loadEnvVar() {
  const enviroment = process.env.NODE_ENV || "development";

  if (enviroment !== "production") {
    dotenv.config();
  }

  if (fs.existsSync(".env.local")) {
    override(dotenv.parse(fs.readFileSync(".env.local")));
  }

  if (fs.existsSync(".env.production.local") && enviroment === "production") {
    override(dotenv.parse(fs.readFileSync(".env.production.local")));
  }
}

module.exports = loadEnvVar;
