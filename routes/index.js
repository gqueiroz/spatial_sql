"use strict";

const express = require('express');
const db = require('./db');

let router = express.Router();

router.get('/', function (req, res, next) {
  // select ST_AsGeoJSON(geom) from municipios limit 1
  console.log('query got is: ' + req.query);
  if (req.query.query === undefined) {
    res.render('index');
    return;
  }
  db.query(req.query.query, (err, db_res) => {
    let result;
    if (err) {
      console.log(err.stack);
      result = err.stack;
    } else {
      console.log(db_res.rows);
      result = db_res.rows[0].st_asgeojson;
    }
    res.render('index', {
      query_result: result,
    });
  });
});

module.exports = router;
