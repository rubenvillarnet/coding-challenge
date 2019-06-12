var express = require('express');
var router = express.Router();

const isReachable = require('is-reachable');




router.get("/health", function(req, res, next) {
  isReachable(`${process.env.DBHOST}:${process.env.DBPORT}`)
  .then(response => res.json({
    databaseHost: process.env.DBHOST,
    databasePort: process.env.DBPORT,
    isAlive: response
  }))


});

module.exports = router;