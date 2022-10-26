import express = require('express');
import { Response, Request } from 'express';
require('dotenv').config();
import cookieParser = require("cookie-parser");
import bodyParser = require('body-parser');
import http = require('http')
import cors = require('cors')
import path = require('path');


let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

const port = process.env.PORT || 5678;

import session = require("client-sessions");
app.use(session({
  cookieName: 'session',
  secret: 'random_string_goes_here',
  duration: 10 * 1000,
  activeDuration: 10 * 1000,
  httpOnly: true,
  secure: true,
  ephemeral: true,
  cookie: { maxAge: 5 * 24 * 60 * 60 * 1000 }
}));

import viewsRouter from './routes/views.routes';
app.use('/', viewsRouter)
import userRouter from './routes/user.routes';
app.use('/api/user', userRouter)
import playerRouter from './routes/player.routes';
app.use('/api/player', playerRouter)

// catch 404 and forward to error handler
app.use(function (req, res: Response, next) {
    let err = new Error('Not Found');
    res.status(404);
    next(err);
  });
  // error handlers
  // development error handler
  // will print stacktrace
  if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }
  
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });
  
  http.createServer(app).listen(port, function() {
    console.log('Express server listening on port ' + port);

});