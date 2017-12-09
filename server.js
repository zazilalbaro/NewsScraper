// packages
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// handlebars
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// scraping tools
const cheerio = require("cheerio");

// models
const db = require("./models");
const PORT = 3000;

//Initialize Express
const app = express();

// Body Parser for Form Submissions
app.use(bodyParser.urlencoded({ extended: false }));

// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// Connect to the Mongo DB with mongoose
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/news-scraper-delight", {
  useMongoClient: true
});

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT);
});