import dotenv from "dotenv";

import assert from "assert";

dotenv.config();

const {
  HOST_URL,
  HOST,
  PORT,
  SQL_SERVER,
  SQL_USER,
  SQL_PWD,
  SQL_DB,
  JWT_SECRET,
} = process.env;

const sqlEncrypt = process.env.SQL_ENCRYPT === "true";

assert(PORT, "HOST_URL is required");
assert(HOST, "HOST is required");

const config = {
  port: PORT,
  host: HOST,

  url: HOST_URL,
  sql: {
    server: SQL_SERVER,
    user: SQL_USER,
    password: SQL_PWD,
    database: SQL_DB,
    options: {
      encrypt: sqlEncrypt,
      enableArithAbort: true,
    },
  },
  jwt_secret: JWT_SECRET,
};

export default config;
