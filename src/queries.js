const loadEnv = require("./utils/loadEnv");
const Pool = require("pg").Pool;
const { v4 } = require("uuid");

const pool = new Pool({
  user: loadEnv("DB_USER"),
  host: "localhost",
  database: "home_hunter_api",
  password: loadEnv("DB_PASS"),
  port: 5432,
})


const getHomes = (req, res) => {
  return pool.query("SELECT * FROM homes ORDER BY id ASC", (error, result) => {
    if (error) throw error;
    res.status(200).json(result.rows);
  })

}

const getHomeById = (req, res) => {
  const id = parseInt(req.params.id)

  return pool.query("SELECT * FROM homes WHERE id = $1", [id], (error, result) => {
    if(error) throw error
    res.status(200).json(result.rows);
  })
}

const createHome = (req, res) => {
  const uuid = v4();
  const { id, cost, address, type, features, status, contact, photo, notes } = req.body;

  return pool.query(
    `
      INSERT INTO homes (
        "id",
        "cost",
        "address", 
        "type",
        "features",
        "status",
        "contact",
        "photo",
        "notes",
        "createdAt",
        "updatedAt"
      )
      VALUES (
        $1,
        $2,
        $3,
        $4,
        ARRAY $5,
        $6,
        $7,
        $8,
        $9,
        current_timestamp,
        current_timestamp
      );
    `,
    [ uuid, JSON.stringify(cost), address, type, features, status, JSON.stringify(contact), photo, notes ], (error, result) => {
      if(error) throw error
      res.status(200).json(uuid);
    }
  );
}

const updateHome = (req, res) => {
  const id = parseInt(req.params.id);
  const { cost, address, type, features, status, contact, photo, notes } = req.body;

  return pool.query(
    `
    UPDATE homes SET
      cost = $1,
      address = $2, 
      type = $3,
      features = $4,
      status = $5,
      contact = $6,
      photo = $7,
      notes = $8,
      updatedAt = current_timestamp
    WHERE id = $9
    )
    VALUES (
      $1,
      $2,
      $3,
      ARRAY $4,
      $5,
      $6,
      $7,
      $8,
      $9,
      current_timestamp,
      current_timestamp
    );
    `,
    [ cost, address, type, features, status, contact, photo, notes, id ],
    (error, result) => {
      if(error) throw error
      res.status(200).send(`Home modified with ID: ${id}`)
    }
  );
}

const deleteHome = (request, response) => {
  const id = parseInt(request.params.id);

  return pool.query('DELETE FROM homes WHERE id = $1', [id], (error, result) => {
    if(error) throw error

    response.status(200).send(`Home deleted with ID: ${id}`)
  });
}

module.exports = {
  getHomes,
  getHomeById,
  createHome,
  updateHome,
  deleteHome,
};