let express = require('express');
let router = express.Router();



module.exports.displayHomePage = (req, res, next)=> {
    res.render('index', { title: 'Home' 
    });
}
//displays the home page. I did not add the about me, projects or 
//contact us [age]
