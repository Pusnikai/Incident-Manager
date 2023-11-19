let express = require('express');

let createError = require('http-errors');
let logger = require('morgan');

let cookieParser = require('cookie-parser');
let path = require('path');

let mongoose = require('mongoose');
mongoose.connect(DB.URI);
let mongoDB = mongoose.connection;
mongoDB.on('error',console.error.bind(console,'Connection Error'));
mongoDB.once('open',()=>{console.log("Connection to the MongoDB is made.")});

let indexRouter = require('index');
let usersRouter = require('users');
let incidentRouter = require('incident');
let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');
app.use(logger('dev'));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, 'node_modules')));
app.use('/',indexRouter);

app.use('/users',usersRouter);
app.use('/incident',incidentRouter);

app.use(function(req, res, next) {
    next(createError(404));
});

app.use(function(err, req, res, next) {
    res.locals.message = err.message;

    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error',
    {
      title:"Error"
    }
    );
  });



module.exports = app;