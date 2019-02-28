import { Pool } from "pg";
import loadEnv from "../utils/loadEnv";

let pool: any;

export default function getPool() {
  if (!pool) {
    pool =  new Pool({
      user: loadEnv("DB_USER"),
      host: "localhost",
      database: "home_hunter_api",
      password: loadEnv("DB_PASS"),
      port: 5432
    });
  }

  return pool;
};