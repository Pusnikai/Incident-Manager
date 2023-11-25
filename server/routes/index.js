let express = require('express');
let router = express.Router();
let indexcontroller = require('../controller/index');

/* GET home page. */
router.get('/', indexcontroller.displayHomePage);

/* GET home page. */
router.get('/home', indexcontroller.displayHomePage);

module.exports = router;
