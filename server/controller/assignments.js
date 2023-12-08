// Import necessary modules and dependiencies
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// Import the Assignment model
let Assignment = require('../models/assignments');


// Display the list of assignments
module.exports.displayassignmentlist = async(req, res, next) => { //use async for updated mongoose
    try {
        // Retrieve all assignments from the database
        const reportList = await Assignment.find();
        // Render the list view with assignment data
        res.render('assignment/list', {
            title: 'report',
            report: reportList,
            displayName: req.user ? req.user.displayName : ''
        });
    } catch (err) {
        console.error(err);
        // Handle errors while retching data
        res.render('assignment/list', {
            error: 'Error on server'
        });
    }
}

// Render the page to add a new assignment
module.exports.displayAddPage = async(req, res, next) => {
        res.render('assignment/add', {
            title: 'Add Assignment',
            displayName: req.user ? req.user.displayName : ''
        });
    } // renders the add page

// Process addition of a new assignment
module.exports.processAddPage = async(req, res, next) => {
    try {
        // Create a new assignment using data from the request body
        const newAssignment = await Assignment.create({ //uses await because of updated mongoose
            "Name": req.body.Name,
            "DateTime": req.body.DateTime,
            "Type": req.body.Type,
            "Description": req.body.Description,
            "Admin": req.body.Admin,
            "Damage": req.body.Damage,
            "Status": req.body.Status
        });
        // Redirect to the assignments page after addition
        res.redirect('/assignments'); //redirects to the assignment page after adding new item
    } catch (err) {
        //handles the error during the assignment reaction
        console.error(err);
        res.render('assignment/add', { error: 'There is an error on server' });
    }
}


// Display the page to edit an assignment
module.exports.displayEditPage = async(req, res, next) => {
    let id = req.params.id;

    try {
        // Find the assignment by ID for editing
        const assignmentToEdit = await Assignment.findById(id);
        // Render the edit page with assignment data
        res.render('assignment/edit', {
            title: 'Edit Assignment',
            assignments: assignmentToEdit,
            displayName: req.user ? req.user.displayName : ''
        });
    } catch (err) {
        console.error(err);
        res.render('assignment/edit', { error: 'there is an error on server' });
    }
}
// Precess the editing of an assignment
module.exports.processEditPage = async(req, res, next) => {
    let id = req.params.id;

    try {
        const updatedAssignments = {
            "Name": req.body.Name,
            "DateTime": req.body.DateTime,
            "Type": req.body.Type,
            "Description": req.body.Description,
            "Admin": req.body.Admin,
            "Damage": req.body.Damage,
            "Status": req.body.Status
        };
        // Update the assignment using its ID
        await Assignment.updateOne({ _id: id }, updatedAssignments); //updates using id
        // Redirect to assignments page after update
        res.redirect('/assignments'); //redirects to the assignment page after adding new item
    } catch (err) {
        console.error(err);
        res.render('assignment/edit', { error: 'there is an error on server' });
    }
}

// Perform the deletion of an assignment
module.exports.preformDelete = async(req, res, next) => {
    let id = req.params.id;

    try {
        // Delete an assignment by its ID
        await Assignment.deleteOne({ _id: id });
        // Redirect to assignment page after the deletion
        res.redirect('/assignments'); //redirects to the assignment page after adding new item
    } catch (err) {
        console.error(err);
        res.render('assignments/list', { error: 'there is an error on server' });
    }
}
