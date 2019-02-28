import getPool from "./adapters";

const updateHome = async (id: number, data: any) => {
  const { cost, address, type, features, status, contact, photo, notes } = data;
  try {
    await getPool().query(`
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
      [ cost, address, type, features, status, contact, photo, notes, id ]
      );
    return `Home updated with ID: ${id}`;
  }
  catch (err) {
    throw new Error(err);
  }
}

export default updateHome;