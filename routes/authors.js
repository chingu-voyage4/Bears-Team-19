var express = require('express');

var router = express.Router();

/* GET authors listing. */
router.get('/', (req, res, next) => {
//  res.send('respond with a resource');

// demo code
  res.json([{
    id: 1,
    name: 'guiprix'
  }, {
    id: 2,
    name: 'sfiquet'
  }, {
    id: 3,
    name: 'ucanfil'
  }]);
});

module.exports = router;
