const express = require("express");
const router = express.Router();

const movieController = require("../controllers/movie");

router.get("/", movieController.getAllMovies);

router.post("/newmovie", movieController.createMovie);

router.get("/actor/:name", movieController.getActorMovies);

router.get("/director/:name", movieController.getDirectorMovies);

module.exports = router;
