import loadEnv from "../../utils/loadEnv";
import createHome from "../../helpers/createHome";
import updateHome from "../../helpers/updateHome";

import deleteHome from "../../helpers/deleteHome";

import getHomes from "../../helpers/getHomes";

import getHomeById from "../../helpers/getHomeById";


import { v4 } from "uuid";
import { Request, Response } from "express";
import { Router as router } from "express";

const route = router();

route.get("/", async (req, res) => {
  try {
    const result = await getHomes();
    res.json(result.rows);
  }
  catch (err) {
    throw new Error(err);
  }
})

route.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id)

  try {
    const result = await getHomeById(id);
    res.json(result.rows);
  }
  catch (err) {
    throw new Error(err);
  }
})

route.put("/", async (req, res) => {
  const uuid = v4();
  try {
    await createHome(uuid, req.body);
    res.send(200);
    return `Home created with id ${uuid}`;
  }
  catch (err) {
    throw new Error(err);
  }
})

route.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    await updateHome(id, req.body);
    res.send(200);
    return `Home updated with id ${id}`;
  }
  catch (err) {
    throw new Error(err);
  }
})

route.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    await deleteHome(id);
    res.send(200);
    return `Home deleted with id ${id}`;
  }
  catch (err) {
    throw new Error(err);
  }
})

export default route;