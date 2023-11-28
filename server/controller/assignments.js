let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');


let Assignment = require('../models/assignments'); 



module.exports.displayassignmentlist = async (req, res, next) => { //use async for updated mongoose
    try {
        const reportList = await Assignment.find(); 
        res.render('assignment/list', {
            title: 'report',
            report: reportList,
            displayName: req.user ? req.user.displayName: '' 
        });
    } catch (err) {
        console.error(err);
        // Handls error
        res.render('assignment/list', {
            error: 'Error on server'
        });
    }
}


module.exports.displayAddPage = async (req, res, next) => {
    res.render('assignment/add', { title: 'Add Assignment',
    displayName: req.user ? req.user.displayName: '' });
}//renders the add page
module.exports.processAddPage = async (req, res, next) => {
    try {
        const newAssignment = await Assignment.create({//uses await because of updated mongoose
            "Name": req.body.Name,
            "DateTime": req.body.DateTime,
            "Type": req.body.Type,
            "Description": req.body.Description,
            "Admin": req.body.Admin,
            "Damage": req.body.Damage,
            "Status": req.body.Status
        });

        res.redirect('/assignments');//redirects to the assignment page after adding new item
    } catch (err) {
        //handles the error
        console.error(err);
        res.render('assignment/add', { error:'There is an error on server' });
    }
}



module.exports.displayEditPage = async (req, res, next) => {
    let id = req.params.id;

    try {
        const assignmentToEdit = await Assignment.findById(id);
        res.render('assignment/edit', { title: 'Edit Assignment', assignments: assignmentToEdit,
        displayName: req.user ? req.user.displayName: '' });
    } catch (err) {
        console.error(err);
        res.render('assignment/edit', { error: 'there is an error on server' });
    }
}
module.exports.processEditPage =  async (req, res, next) => {
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

        await Assignment.updateOne({ _id:id}, updatedAssignments);//updates using id
        res.redirect('/assignments');//redirects to the assignment page after adding new item
    } catch (err) {
        console.error(err);
        res.render('assignment/edit', { error: 'there is an error on server' });
    }
}

module.exports.preformDelete = async (req, res, next) => {
    let id = req.params.id;
    
    try {
        await Assignment.deleteOne({ _id: id });//does the delete
        res.redirect('/assignments');//redirects to the assignment page after adding new item
    } catch (err) {
        console.error(err);
        res.render('assignments/list', { error: 'there is an error on server' });
    }
}