const express = require('express');
const router  = express.Router();
const Movie = require('../models/movie.js');

/* GET detailed movie page */

/*request parameters version*/

router.get('/movie/:movieId', (req, res) => {
    Movie.findById(req.params.movieId)
      .then ((movie) => {
        res.render("movie-details", {movie})
        })
      .catch((err) => {
        res.send(err)
      })
  });

/*request query version*/

// router.get('/movie', (req, res) => {
//     Movie.findById(req.query.movieId)
//       .then ((movie) => {
//         res.render("movie-details", {movie})
//         })
//       .catch((err) => {
//         res.send(err)
//       })
//   });

module.exports = router;
