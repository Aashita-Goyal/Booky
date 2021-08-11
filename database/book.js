const mongoose = require("mongoose");

// Creating a book schema
const BookSchema = mongoose.Schema({
  ISBN: {
    type: String,
    required: true, //ISBN compulsory
    minLength: 8,
    maxLength: 10,
  },
  title: {
    type: String,
    required: true, //title compulsory
    minLength: 8,
    maxLength: 10,
  },
  authors: {
    type:[Number],
    required: true,
  },
  language: String,
  pubDate: String,
  numOfPage: Number,
  category: [String],
  publication: Number,
});

// Create a book model
const BookModel = mongoose.model("books",BookSchema);

module.exports = BookModel;
