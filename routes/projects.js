
var express = require('express');
var router = express.Router();

/* GET users listing.*/
router.get('/', function(req, res, next) {
  res.json([
    {
      id:'1', 
      title: 'Ultimate to-do list',
      author:'Bears 19', 
      category:['web' ,'development'], 
      keywords:['web', 'react', 'js'], 
      description:'We want to create the ultimate to-do list! The project is already started and we need more developers.\nContact me for more info.'
    },
    {
      id:'2', 
      title: 'Mario-inspired game for the web',
      author:'Bears 19', 
      category:['gaming'], 
      keywords:['web','react', 'js'], 
      description:'The idea is to create a platformer inspired by Mario and have it run in the browser. We need artists, javascript developers, level designers...'
    }
  ]);
});

module.exports = router;
