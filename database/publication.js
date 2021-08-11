const mongoose = require("mongoose");

// Publication Schema
const PublicationSchema = mongoose.Schema({
  id:{
    type: Number,
    required: true,
    minLength: 5,
    maxLength: 12,
  },
  name: {
    type: String,
    required: true,
  },
  books: [String],
});

// Publication Model
const PublicationModel = mongoose.model("publications",PublicationSchema);

module.exports = PublicationModel;
