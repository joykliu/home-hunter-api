import { Router as router } from "express";
import homes from "./homes";

const route = router();


route.use("/", homes);

export default route;