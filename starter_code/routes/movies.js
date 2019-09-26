const express = require('express');
const router  = express.Router();
const Movie = require('../models/movie.js');

/* GET movies page */
router.get('/movies', (req, res, next) => {
    Movie.find()
      .then(allTheMoviesfromDB => {
        //console.log('Retrieved books from DB:', allTheMoviesfromDB);
        res.render('movies', {movies: allTheMoviesfromDB});
      })
      .catch(error => {
        console.log('Error while getting the movies from the DB: ', error);
      })
  });

//Create new document
router.get("/movie/create", (req, res) => { 
  res.render("create-movie") 
})

//Send and process data from the form to the route 
router.post("/movie/create", (req,res)=> {
//get post data from the form
console.log(req.body.name)
var newMovie = new Movie({
      title: req.body.title,
      director: req.body.director,
      description: req.body.description,
      image: req.body.image,
//create new movie using movie.js model
})
  newMovie.save()
      .then((movie)=> {
          res.redirect(`/movie/${movie.id}`)
      })
      .catch((error)=> {
          res.send(error)
      })
  })

router.get("/movie/details", (req, res)=> {
  Movie.findById(req.query.movieId)
      .then((movie)=> {
          res.render("movie-details", {movie:movie})
      })
      .catch((err)=> {
          res.send(err)
      })
})

router.get("/movie/delete/:movieId", (req, res)=> {
  Movie.findByIdAndDelete(req.params.movieId)
      .then((movie)=> {
          res.redirect("/movies")
      })
      .catch((err)=> {
          res.send(err)
      })
})

module.exports = router;