let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let Assignment = require('../models/assignments'); // Change variable name to singular, e.g., Assignment
let assignmentController = require('../controller/assignments')
    /* read */

function requireAuth(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
}



router.get('/', assignmentController.displayassignmentlist);

/* Create */
/* get route for display and post for processing */
router.get('/add', requireAuth, assignmentController.displayAddPage);
router.post('/add', requireAuth, assignmentController.processAddPage);

/* Update */
/* get route for display and post for processing */
router.get('/edit/:id', requireAuth, assignmentController.displayEditPage);
router.post('/edit/:id', requireAuth, assignmentController.processEditPage);
/* Delete */
/* get route for display and post for processing */

router.get('/delete/:id', requireAuth, assignmentController.preformDelete);



module.exports = router;