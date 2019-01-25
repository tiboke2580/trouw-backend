let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let bodyParser = require('body-parser');


let mongoose = require('mongoose');
let passport = require('passport');

mongoose.connect(process.env.SCHOOL_DATABSE || 'mongodb://localhost/trouwdb');
mongoose.set('useCreateIndex', true);

require('./models/user');
require('./config/passport');


let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');

let app = express();
let cors = require('cors');

app.use(express.static(__dirname + '/dist'));

app.all('*', (req,res) => {
  const indexFile = `${path.join(__dirname, 'dist')}/index.html`;
  res.status(200).sendFile(indexFile);
})

app.use(cors({origin: "*"}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());


app.use('/', indexRouter);
app.use('/API/users', usersRouter);

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
});

module.exports = app;
