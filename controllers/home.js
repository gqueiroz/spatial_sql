"use strict";

const Municipio = require("../models/municipio");
const Router = require("express-promise-router");

const router = new Router();

router.get("/", async (req, res) => {
  const query = req.query.query;

  if (query === undefined) {
    res.render("index");
    return;
  }

  const result = await Municipio.execute_query(query);
  res.render("index", {
    query_result: result,
  });
});

module.exports = router;
