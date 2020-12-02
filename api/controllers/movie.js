const Movie = require("../models/movie");

exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    return res.status(200).json({ movies });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ movies });
  }
};

exports.createMovie = async (req, res) => {
  const movie = {
    title: req.body.title,
    cast: req.body.cast,
    actorSlug: req.body.actorSlug,
    image: req.body.image,
    director: req.body.director,
    directorSlug: req.body.directorSlug,
    rating: req.body.rating,
  };
  try {
    const newMovie = await Movie.create(movie);
    return res.status(200).json(newMovie);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Error" });
  }
};

exports.getActorMovies = async (req, res) => {
  const { name } = req.params;
  try {
    const movie = await Movie.find({ actorSlug: name });
    return res.status(200).json(movie);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Error" });
  }
};

exports.getDirectorMovies = async (req, res) => {
  const { name } = req.params;
  try {
    const movie = await Movie.find({ directorSlug: name });
    return res.status(200).json(movie);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Error" });
  }
};
