import getPool from "./adapters";

const deleteHome = async (id: number) => {
  try {
    await getPool().query("DELETE FROM homes WHERE id = $1", [id]);
    return `Home deleted with ID: ${id}`;
  } catch (err) {
    throw new Error(err);
  }
};

export default deleteHome;
