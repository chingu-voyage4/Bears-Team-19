const express = require('express');
const path = require('path');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res /* , next */) => {
  res.sendFile('index.html', { root: path.join(__dirname, '../public/build') });
});

module.exports = router;
