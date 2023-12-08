// Requires the Express module and assigns it the 'express' variable
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('This is a User Page');
});

// Exports the router object so that it can be used in other parts of the application
module.exports = router;
