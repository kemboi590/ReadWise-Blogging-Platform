import sql from "mssql";
import config from "../db/config.js";

// GET ALL BLOGS
export const getBlogs = async (req, res) => {
  try {
    let pool = await sql.connect(config.sql);
    const result = await pool.request().query("EXEC GetAllBlogPostDetails");
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
    const { UserID } = req.user;
    const { Title, BlogDesc, Content, Category, CreatedAt, UpdatedAt } =
      req.body;
    let pool = await sql.connect(config.sql);
    await pool
      .request()
      .input("UserID", sql.Int, UserID)
      .input("Title", sql.VarChar, Title)
      .input("BlogDesc", sql.VarChar, BlogDesc)
      .input("Content", sql.VarChar, Content)
      .input("Category", sql.VarChar, Category)
      .input("CreatedAt", sql.VarChar, CreatedAt)
      .input("UpdatedAt", sql.VarChar, UpdatedAt)
      .query(
        "INSERT INTO BlogPost (UserID, Title, BlogDesc, Content, Category, CreatedAt, UpdatedAt) VALUES (@UserID, @Title, @BlogDesc, @Content, @Category, GETDATE(), GETDATE())"
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
      .query("EXEC GetBlogPostDetails @PostID = @id");
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
    const { Title, BlogDesc, Content, Category, UpdatedAt } = req.body;
    let pool = await sql.connect(config.sql);
    await pool
      .request()
      .input("id", sql.VarChar, id)
      .input("Title", sql.VarChar, Title)
      .input("BlogDesc", sql.VarChar, BlogDesc)
      .input("Content", sql.VarChar, Content)
      .input("Category", sql.VarChar, Category)
      .input("UpdatedAt", sql.VarChar, UpdatedAt)
      .query(
        " UPDATE BlogPost SET Title = @Title, BlogDesc = @BlogDesc, Content = @Content, Category = @Category, UpdatedAt = GETDATE() WHERE PostID = @id "
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
      .query("DELETE FROM BlogPost WHERE PostID = @id");
    res.status(200).json("Blog deleted successfully");
  } catch (error) {
    res.status(500).json(error.message);
  } finally {
    sql.close();
  }
};
