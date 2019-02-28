import { Router as router } from "express";
import homes from "./homes";

const route = router();

route.use("/homes", homes);
route.get("/", (req, res) => {
  res.json({ info: "Node.js, Express, and Postgres API" });
});
export default route;
