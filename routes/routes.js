const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

module.exports = app => {

  // A GET route for scraping the echojs website
  app.get("/scrape", function(req, res) {
    // grab the body of the html with request
    axios.get("http://www.echojs.com/").then(function(response) {
      
      var $ = cheerio.load(response.data);
      
      $("article h2").each(function(i, element) {
        
        var result = {};
        // Add the text and href of every link, and save them as properties of the result object
        result.title = $(this)
          .children("a")
          .text();
        result.link = $(this)
          .children("a")
          .attr("href");
        // Create a new Article using the `result` object built from scraping
        db.Article
          .create(result)
          .then(function(dbArticle) {
            // success
            res.send("Scrape Complete");
          })
          .catch(function(err) {
            // or show error
            res.json(err);
          });
      });
    });
  });

  // Route for getting all Articles from the db
  app.get("/articles", function(req, res) {
    // Grab every document in the Articles collection
    db.Article
      .find({})
      .then(function(dbArticle) {
        // success
        res.json(dbArticle);
      })
      .catch(function(err) {
        // or show error
        res.json(err);
      });
  });

  // Route for grabbing a specific Article by id, populate it with it's note
  app.get("/articles/:id", function(req, res) {
    db.Article
      // Find the first article that matches the id passed
      .findOne({ _id: req.params.id })
      .populate("note")
      .then(function(dbArticle) {
        // success
        res.json(dbArticle);
      })
      .catch(function(err) {
        // or show error
        res.json(err);
      });
  });

  // Route for saving/updating an Article's associated Note
  app.post("/articles/:id", function(req, res) {
    // Create a new note and pass the req.body to the entry
    db.Note
      .create(req.body)
      .then(function(dbNote) {
        return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
      })
      .then(function(dbArticle) {
        // success
        res.json(dbArticle);
      })
      .catch(function(err) {
        // or show error
        res.json(err);
      });
  });
};