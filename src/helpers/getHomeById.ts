import getPool from "./adapters";

const getHomesById = async (id: number) => {
  try {
    const res = await getPool().query("SELECT * FROM homes WHERE id = $1", [id]);
    if (!res || res.rows.length === 0) {
      throw new Error(`No home found with id ${id}`);
    }
    return res;
  }
  catch (err) {
    throw new Error(err);
  }
}

export default getHomesById;