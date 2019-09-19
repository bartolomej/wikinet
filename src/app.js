const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config({path: path.join(__dirname, '..', '.env')});
const indexRouter = require('./api/views');
const usersRouter = require('./api/rest');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use('/public', express.static('public', {extensions: ['js', 'html', 'css']}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use('/', indexRouter);
app.use('/api', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  console.log('error: ', err);
  if (new RegExp('/api').test(req.path)) {
    res.send({
      status: 'error',
      name: err.name,
      message: err.message,
      stack: process.env.NODE_ENV !== 'production'
        ? err.stack : undefined
    })
  } else {
    res.locals.name = err.name;
    res.locals.message = err.message;
    if (process.env.NODE_ENV !== 'production') {
      res.locals.stack = err.stack;
    }
    res.status(err.status || 500);
    res.render('error');
  }
});

app.listen(process.env.PORT || 3000);
app.on('listening', () => console.log(`App started on ${process.env.PORT}`));
