import { Pool } from "pg";
import loadEnv from "../utils/loadEnv";

let pool: any;

export default function getPool() {
  if (!pool) {
    pool = new Pool({
      database: "home_hunter_api",
      host: "localhost",
      password: loadEnv("DB_PASS"),
      port: 5432,
      user: loadEnv("DB_USER")
    });
  }

  return pool;
}
