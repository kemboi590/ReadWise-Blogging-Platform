import sql from "mssql";
import config from "../db/config.js"; //
//get likes
export const getLikes = async (req, res) => {
  try {
    let pool = await sql.connect(config.sql);
    const result = await pool.request().query("SELECT * FROM Likes");
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(201).json(error.message);
  } finally {
    sql.close();
  }
};
//create like
export const createLike = async (req, res) => {
  try {
    const { id } = req.params;
    const { UserID } = req.user;

    let pool = await sql.connect(config.sql);
    await pool
      .request()
      .input("id", sql.Int, id)
      .input("UserID", sql.Int, UserID)
      .query("INSERT INTO Likes (PostID, UserID) VALUES ( @id, @UserID)");
    res.status(200).json("Like success");
  } catch (error) {
    res.status(201).json(error.message);
  } finally {
    sql.close();
  }
};

export const deleteLike = async (req, res) => { 
  try {
    const { id } = req.params;
    const { UserID } = req.user;

    let pool = await sql.connect(config.sql);
    await pool
      .request()
      .input("id", sql.Int, id)
      .input("UserID", sql.Int, UserID)
      .query("DELETE FROM Likes WHERE PostID = @id AND UserID = @UserID");
    res.status(200).json("Like deleted");
  } catch (error) {
    res.status(201).json(error.message);
  } finally {
    sql.close();
  }
}