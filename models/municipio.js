"use strict";

const db = require("../helpers/db");

// select ST_AsGeoJSON(geom) from municipios limit 1
module.exports.execute_query = async (query) => {
  try {
    const res = await db.query(query);
    return res.rows[0].st_asgeojson;
  }
  catch (err) {
    console.log("Municipio.execute_query error: " + err);
    return err;
  }
};
