let express = require('express');
let router = express.Router();
let indexcontroller = require('../controller/index');

/* GET home page. */
router.get('/', indexcontroller.displayHomePage);

/* GET home page. */
router.get('/home', indexcontroller.displayHomePage);


router.get('/login', indexcontroller.displayLoginPage);
router.post('/login', indexcontroller.processLoginPage);

router.get('/register', indexcontroller.displayRegisterPage);
router.post('/register', indexcontroller.processRegisterPage);


router.get('/logout', indexcontroller.performLogout);
module.exports = router;
