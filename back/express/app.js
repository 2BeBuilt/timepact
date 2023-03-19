if (!process.env.EXPRESS_PORT)
  // non-docker run
  require("dotenv").config({ path: "../.env" });

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// routers
var indexRouter = require("./routes/index");
var dealsRouter = require("./routes/deals");
var ipfsRouter = require("./routes/ipfs");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// dev
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// use routers
app.use(path.join(process.env.BASE_URL, "/"), indexRouter);
app.use(path.join(process.env.BASE_URL, "/deals"), dealsRouter);
app.use(path.join(process.env.BASE_URL, "/ipfs"), ipfsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
