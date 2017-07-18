"use strict";

const GeoJSON = require('geojson');

const db = require("../helpers/db");

// select ST_AsGeoJSON(geom) from municipios limit 1
// select * from municipios limit 1
module.exports.execute_query = async (query) => {
  try {
    const res = await db.query(query);
    console.log("Municipio.execute_query query: " + JSON.stringify(res));
    const row = res.rows[0].st_asgeojson;
    // const geojson = GeoJSON.parse(row, {
    //   // Point: ["latitudese", "longitudes"],
    //   row["type"]: "coordinates",
    // });
    // console.log("Municipio.execute_query geojson: " + JSON.stringify(geojson));
    return row;
  }
  catch (err) {
    console.log("Municipio.execute_query error: " + err);
    return err;
  }
};
