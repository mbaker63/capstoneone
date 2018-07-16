import express from 'express';
import passport from 'passport';
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8080);
io.on('connection', function (socket) {
  socket.emit('msg', { hello: 'world' });
  socket.on('cmd', function (data) {
    console.log(data);
  });
});

passport.use(new LocalStrategy(function(user, pass, cb){...});

// session configuration
passport.serializeUser();
passport.deserializeUser();

// connect passport to express via express middleware
app.use(passport.initialize());
app.use(passport.session());
