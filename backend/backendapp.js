
//Imports needed: RUN NPM INSTALL UPON OPENING
import passport from 'passport';
import express from 'express';
import session from "express-session";
import bodyParser from "body-parser";
import mongoose from 'mongoose';
import models from './models'
//import models
var LocalStrategy =  require('passport-local').Strategy;


//Scaffolding
var app = express();

app.use(express.static("public"));
app.use(session({ secret: "mackbenjacobandrew" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
mongoose.connect(process.env.MONGODB_URI);



//Local LocalStrategy
passport.use(new LocalStrategy(
  function(username, password, done) {
    models.User.findOne({ username: username, password: password }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      return done(null, user);
    });
  }
));

//Serialization and Deserialization
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  models.User.findById(id, function(err, user) {
    done(err, user);
  });
});


//ROUTES

app.post('/login', (req, res, next) => {
  console.log(req.body);
  passport.authenticate('local', function(err, user, info){
    if (user) res.json({status: 200})
    else res.status(401).json()
  })(req,res,next)
  }
)


app.post('/register', (req, res) => {
  console.log('first', req.body);
  models.User.findOne({username: req.body.username })
  .then(user => {
    if (!user){
      var user = new models.User({
        username: req.body.username,
        password: req.body.password
      })
      return user.save()
    } else {
      throw "Username already exists"
    }
  })
  .then(resp => res.json(resp))
  .catch(err => res.json({err: err}));
})


app.post('/')


app.listen(3000, function(){
  console.log('Listening on 3000')
})

module.exports = app;
