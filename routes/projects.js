
var express = require('express');
var router = express.Router();

/* GET users listing.*/
router.get('/', function(req, res, next) {
  res.json([
    {id:'1', title: 'snap this',author:'Bears 19', category:'web development'
  , keywords:'web, react, js', description:'lore ipsum....'},

    {id:'1', title: 'buckets challange',author:'Bears 19', category:'gaming'
, keywords:'web, react, js', description:'lore ipsum....'},

  ]);
});

module.exports = router;
