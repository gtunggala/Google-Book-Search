const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require("mongoose");
const MONGODBI_URI =
  process.env.MONGODBI_URI ||
  "mongodb://heroku_ph1n9006:c5v3ru1i6ndf8kkj2qfdap69pf@ds151997.mlab.com:51997/heroku_ph1n9006";
mongoose.connect("mongodb://localhost/googlebooks", { useNewUrlParser: true });
var Schema = mongoose.Schema;

var bookSchema = new Schema({
  title: String,
  authors: Array,
  description: String,
  image: String,
  link: String
});

const Book = mongoose.model("Book", bookSchema);

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Define API routes here
app.get("/api/books", function(req, res) {
  Book.find({}, function(err, books) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    return res.json(books);
  });
});

app.post("/api/books", function(req, res) {
  Book.create(req.body);
  return res.sendStatus(201);
});

app.delete("/api/books", function(req, res) {
  Book.findByIdAndRemove(req.params.id, function() {
    return res.sendStatus(204);
  });
});

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
