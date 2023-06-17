import sql from "mssql";
import config from "./../db/config.js";

// GET ALL BLOGS
export const getBlogs = async (req, res) => {
  try {
    let pool = await sql.connect(config.sql);
    const result = await pool.request().query("SELECT * FROM blog");
    res.json(result.recordset);
  } catch (error) {
    res.status(201).json(error.message);
  } finally {
    sql.close();
  }
};

//CREATE BLOG
export const createBlog = async (req, res) => {
  try {
    const { blogTitle, content } = req.body;
    let pool = await sql.connect(config.sql);
    await pool
      .request()
      .input("blogTitle", sql.VarChar, blogTitle)
      .input("content", sql.VarChar, content)
      .query(
        "INSERT INTO blog (blogTitle, content) VALUES (@blogTitle, @content)"
      );
    res.status(200).json("Blog created successfully");
  } catch (error) {
    res.status(201).json(error.message);
  } finally {
    sql.close();
  }
};

//GET BLOG BY ID
export const getSingleBlog = async (req, res) => {
  try {
    const { id } = req.params;
    let pool = await sql.connect(config.sql);
    const result = await pool
      .request()
      .input("id", sql.VarChar, id)
      .query(`SELECT * FROM blog WHERE blogID = @id`);
    res.status(200).json(result.recordset[0]);
  } catch (error) {
    res.status(201).json(error.message);
  } finally {
    sql.close();
  }
};

//UPDATE BLOG
export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { blogTitle, content } = req.body;
    let pool = await sql.connect(config.sql);
    await pool
      .request()
      .input("id", sql.VarChar, id)
      .input("blogTitle", sql.VarChar, blogTitle)
      .input("content", sql.VarChar, content)
      .query(
        `UPDATE blog SET blogTitle = @blogTitle, content = @content WHERE blogID = @id`
      );
    res.status(200).json("Blog updated successfully");
  } catch (error) {
    res.status(500).json(error.message);
  } finally {
    sql.close();
  }
};

//DELETE BLOG
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    let pool = await sql.connect(config.sql);
    await pool
      .request()
      .input("id", sql.VarChar, id)
      .query(`DELETE FROM blog WHERE blogID = @id`);
    res.status(200).json("Blog deleted successfully");
  } catch (error) {
    res.status(500).json(error.message);
  } finally {
    sql.close();
  }
};
