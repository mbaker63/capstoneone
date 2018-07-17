
//Imports needed: RUN NPM INSTALL UPON OPENING
var passport=require('passport');
var express=require('express');
var session = require('express-session');
var bodyParser = require('body-parser')
var LocalStrategy =  require('passport-local').Strategy;


//Scaffolding
var app = express();

// app.use('/', routes(passport));
// app.use('/', auth(passport));

app.use(express.static("public"));
app.use(session({ secret: "mackbenjacobandrew" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
process.env.MONGODB_URI;


//Local LocalStrategy
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
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
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


//ROUTES

app.post('/login',
  passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/login',
  })
)

app.get('/', function(req, res){
  res.send('Hello World');
})

app.listen(3000, function(){
  console.log('LISTENING ON PORT 3000');
})
module.exports = app;
