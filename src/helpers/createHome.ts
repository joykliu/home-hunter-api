import getPool from "./adapters";

const createHome = async (uuid: string, data: any) => {
  const { cost, address, type, features, status, contact, photo, notes } = data;
  try {
    await getPool().query(`
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
        "createdat",
        "updatedat"
      )
      VALUES (
        $1, 
        $2,
        $3,
        $4,
        $5,
        $6,
        $7,
        $8,
        $9,
        current_timestamp,
        current_timestamp
      );
    `, // use sql injection instead of variables for security reasons
    [ uuid, JSON.stringify(cost), address, type, features, status, JSON.stringify(contact), photo, notes ]
    );
    return `Home created with ID: ${uuid}`;
  }
  catch (err) {
    throw new Error(err);
  }
}

export default createHome;