// Import required modules and dependenices
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// Import the Assignment model
let Assignment = require('../models/assignments'); // Change variable name to singular, e.g., Assignment
// Import the assignmentController for handling routes
let assignmentController = require('../controller/assignments')
    /* 
        Middleware function to check authentication before 
        moving to specific routes
    */

function requireAuth(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
}


// Route for displaying a list of assignments
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
