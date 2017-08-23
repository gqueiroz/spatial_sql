"use strict"

const pg = require("pg")

///////////////////////////////
// Database Setup
///////////////////////////////
const config = {
  user: "postgres",
  password: "postgres",
  database: "spatial_sql_db",
  host: "localhost",
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000,
}
const pool = new pg.Pool(config)

pool.on("error", (err, client) => {
  console.error("PostgreSQL Pool Error: ", err.message, err.stack)
})

module.exports = {
  query: (text, params) => pool.query(text, params),
}
