let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Report = require('../models/report');

module.exports.DisplayReports = async (req, res, next) => {
    try {
        const IncidentList = await Report.find();
        res.render('report/list', {
            title: 'Incidents',
            IncidentList: IncidentList
        });
    } catch (err) {
        console.error(err)
        //Handls error
        res.render('report/list', {
            error: 'error on server'
        });
    }
}

module.exports.displayAddPage = async (req, res, next) => {
    res.render()
}
module.exports.processAddPage = async (req, res, next) => {
    try {
        const newReport = await Report.create({
            //Mongoose Schema goes here
        });

        res.redirect('/report');

    } catch (err) {
        //handles the rror
        console.error(err);
        res.render('report/add', {error: 'There is an error on server'});
    }
}
