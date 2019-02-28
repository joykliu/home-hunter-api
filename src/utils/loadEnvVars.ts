import dotenv from "dotenv";
import fs from "fs";

function override(envObj: any) {
  process.env = { ...process.env, ...envObj };
}

export default function loadEnvVar() {
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
