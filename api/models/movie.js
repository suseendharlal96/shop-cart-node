const { model, Schema } = require("mongoose");

const movieSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  cast: {
    type: String,
    required: true,
  },
  actorSlug: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  directorSlug: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});

module.exports = model("Movie", movieSchema);
