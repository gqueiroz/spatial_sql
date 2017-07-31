"use strict"

const express = require("express")
const exphbs = require("express-handlebars")
const path = require("path")

const app = express()

///////////////////////////////
// View Engine Setup
///////////////////////////////
app.engine("hbs", exphbs({
  defaultLayout: "base",
  extname: ".hbs",
}))
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "hbs")

///////////////////////////////
// Middleware
///////////////////////////////
app.use(express.static(path.join(__dirname, "public")))

///////////////////////////////
// Controllers
///////////////////////////////
app.use("/", require("./controllers"))

///////////////////////////////
// Post-Middleware
///////////////////////////////

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found")
  err.status = 404
  next(err)
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get("env") === "development" ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render("error")
})

module.exports = app
