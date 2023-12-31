/*Installed 3rd party packages */
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let session = require('express-session');
let passport = require('passport');
let passportLocal = require('passport-local');
let localStrategy = passportLocal.Strategy;
let flash = require('connect-flash');
let app = express();
//create a user model inst
let userModel = require('../models/user');
let User = userModel.User;


let mongoose = require('mongoose');
let DB = require('./db');
//this is the mongoose connection
mongoose.connect(DB.URI);
let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error'));
mongoDB.once('open', () => { console.log("The Mongo DB is connected") });

//set express session
app.use(session({
        secret: "somesecert",
        saveUninitialized: false,
        resave: false
    }))
    // setup passport for user authenication
passport.use(User.createStrategy());



//encrypt/decrypt the user info
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//init passport
app.use(passport.initialize());
app.use(passport.session());

//init flash
app.use(flash());


//Imported Routes for the application 
let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let assignmentsRouter = require('../routes/assignments');

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

//Defined routes for the application
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/assignments', assignmentsRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler for application 
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error', {
        title: "Error"
    });
});

module.exports = app;