let express = require('express');
let router = express.Router();

module.exports.DisplayHome = (req, res, next) => {
    res.render('index',{title: 'Home'});
    

}
