var express = require('express');
var router = express.Router();
let jwt = require('express-jwt');
let auth = jwt({secret: process.env.SCHOOL_BACKEND_SECRET});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("server works");
});

module.exports = router;
