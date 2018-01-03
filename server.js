// packages
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");


// const db = require("./models");
const PORT = process.env.PORT || 3000;

//Initialize Express
const app = express();

const router = express.Router();

require("./config/routes")(router);

// Use express.static to serve the public folder as a static directory
app.use(express.static(__dirname + "/public"));

// handlebars
app.engine("handlebars", exphbs({ 
  defaultLayout: "main" 
}));
app.set("view engine", "handlebars");

// Body Parser for Form Submissions
app.use(bodyParser.urlencoded({ 
  extended: false 
}));

app.use(router);

mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/news-scraper-delight", {
  useMongoClient: true
});

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT);
});







// // Routes
// const articleRoutes = require("./config/routes.js");


// // scraping tools
// const cheerio = require("cheerio");







// // register routes
// app.use("/articles", articleRoutes);


// Connect to the Mongo DB with mongoose
// const db = process.env.MONGODB_URI || "mongodb://localhost/news-scraper-delight"
// mongoose.connect(db, function(error) {
//   if (error) {
//     console.log(error);
//   }
//   else {
//     console.log("mongoose connection is successful");
//   }
// });


