import sql from "mssql";
import config from "./../db/config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//loginRequired
export const loginRequired = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized user!" });
  }
};

//register user
export const registerUser = async (req, res) => {
  const { UserName, Email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  console.log(UserName, Email, hashedPassword);
  try {
    //if user already exists
    let pool = await sql.connect(config.sql);
    let result = await pool
      .request()
      .input("UserName", sql.VarChar, UserName)
      .input("Email", sql.VarChar, Email)
      .query(
        "SELECT * FROM UserCredentials WHERE UserName = @UserName AND Email = @Email"
      );
    const user = result.recordset[0];
    if (user) {
      return res.status(409).json("User already exists");
    } else {
      //if user does not exist
      await pool
        .request()
        .input("UserName", sql.VarChar, UserName)
        .input("Email", sql.VarChar, Email)
        .input("hashedPassword", sql.VarChar, hashedPassword)
        .query(
          "INSERT INTO UserCredentials (UserName,Email, hashedPassword) VALUES (@UserName,@Email, @hashedPassword)"
        );
      res.status(200).json("User created successfully");
    }
  } catch (error) {
    res.status(409).json(error.message);
  } finally {
    sql.close();
  }
};

export const loginUser = async (req, res) => {
  const { Email, password } = req.body; //destructuring
  try {
    let pool = await sql.connect(config.sql);
    let result = await pool
      .request()
      .input("Email", sql.VarChar, Email)
      .query("SELECT * FROM UserCredentials WHERE Email = @Email");
    const user = result.recordset[0];
    if (!user) {
      return res.status(401).json("User does not exist");
    } else {
      if (!bcrypt.compareSync(password, user.hashedPassword)) {
        return res.status(401).json("Incorrect password");
      } else {
        //create token
        const token = `JWT ${jwt.sign(
          { Email: user.Email },
          config.jwt_secret,
          { expiresIn: "1h" }
        )}`;
        res.status(200).json({
          UserName: user.UserName,
          Email: user.Email,
          UserCredntialsID: user.UserCredntialsID,
          token: token,
        });
      }
    }
  } catch (error) {
    res.status(409).json(error.message);
  } finally {
    sql.close();
  }
};
