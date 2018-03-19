const express = require('express');

const router = express.Router();

/* GET home page. */
router.post('/register', (req, res) => {
  const response = {
    success: false,
  };
  res.json(response);
});

module.exports = router;
