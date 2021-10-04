const express = require('express');
const router = express.Router();

// twitter list ids accroding to categories
const categories = {
  crypto: '875371355570487296',
  programming: '1324307536300761088',
  thinkers: '1311718915249254401',
};

router.get('/categories', (req, res) => {
  res.send(categories);
});

module.exports = router;
