const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const config = require('./config/config.json');
const mongoose = require('mongoose');

const app = express();



const LocalStrategy = require('passport-local').Strategy;
const session    = require('express-session');
const passport     = require('passport');

require('./config/passport.js');



mongoose.connect('mongodb://localhost:27017/art-db', (err) => {
    if(err) console.log(err)
    else console.log("Connected")
});


app.use(session({
    secret: 'much secret much cat',
    resave: true,
    saveUninitialized: true
}));
    

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'hbs')
app.set('views', __dirname + '/views');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

if(config.environment === "development"){
	app.set('views', path.join(__dirname, 'views'));
	app.use(express.static(path.join(__dirname, 'public')));
	app.use(require("cors")({
        credentials: true,
        origin: ["http://localhost:3000", "http://localhost:3000/", "localhost:3000/", "http://localhost:3001"]
	}));
}

if(config.environment === "production") {	
    app.use(express.static(path.join(__dirname, 'client')));
    app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname, '/client', 'index.html'));
    });
}

app.get("/", (req, res) =>{
    res.render("index")
});

const authroutes = require('./routes/authroutes')
app.use('/api', authroutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
