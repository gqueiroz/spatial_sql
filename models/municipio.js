"use strict"

const GeoJSON = require("geojson")

const db = require("../helpers/db")

// select ST_AsGeoJSON(geom) from municipios limit 1
// select * from municipios limit 1
module.exports.execute_query = async (query) => {
  try {
    const res = await db.query(query)
    console.log("Municipio.execute_query query: " + JSON.stringify(res))
    const rows = res.rows.map(row => JSON.parse(row.st_asgeojson))
    return rows
  }
  catch (err) {
    console.log("Municipio.execute_query error: " + err)
    return err
  }
}
