"use strict"

const Municipio = require("../models/municipio")
const Router = require("express-promise-router")

const router = new Router()

router.get("/", async (req, res) => {
  res.render("index")
})

router.get("/municipios", async (req, res) => {
  const query = req.query.query

  if (query === undefined) {
    res.json({})
    return
  }

  const result = await Municipio.execute_query(query)
  res.json(result)
})

module.exports = router
