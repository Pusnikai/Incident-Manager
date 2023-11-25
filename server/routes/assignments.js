let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let Assignment = require('../models/assignments'); // Change variable name to singular, e.g., Assignment
let assignmentController = require('../controller/assignments')
/* read */

router.get('/', assignmentController.displayassignmentlist);

/* Create */
/* get route for display and post for processing */
router.get('/add', assignmentController.displayAddPage);
router.post('/add',assignmentController.processAddPage);

/* Update */
/* get route for display and post for processing */
router.get('/edit/:id', assignmentController.displayEditPage);
router.post('/edit/:id', assignmentController.processEditPage);
/* Delete */
/* get route for display and post for processing */

router.get('/delete/:id', assignmentController.preformDelete);



module.exports = router;
