import getPool from "./adapters";

const getHomes = async () => {
  try {
    const res = await getPool().query("SELECT * FROM homes ORDER BY id ASC");
    if (!res || res.rows.length === 0) {
      throw new Error("No homes found");
    }
    return res;
  }
  catch (err) {
    throw new Error(err);
  }
}

export default getHomes;