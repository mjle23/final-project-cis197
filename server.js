var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');
var mongoose = require('mongoose');
var isAuthenticated = require('./middlewares/isAuthenticated.js');
var Shoutout = require('./models/shoutout.js');
var accountRouter = require('./routes/account.js');
var apiRouter = require('./routes/api.js');
var app = express();
var User = require('./models/user.js');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/final-project')

app.engine('html', require('ejs').__express);
app.set('view engine', 'html');

app.use('/static', express.static(path.join(__dirname, 'static')))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// TODO: configure body parser middleware to also accept json. just do
// app.use(bodyParser.json())

app.use(cookieSession({
  name: 'local-session',
  keys: ['spooky'],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))


app.get('/', function (req, res, next) {
  Shoutouts = Shoutout.find({}, function (err, result) {
    if (!err) {
      res.render('index', { 
        shoutouts: result, 
        user: req.session.user 
      })
    } else {
      next(err)
    }
  })
});


app.post('/', function (req, res, next) {
  var shoutoutText = req.body.shoutout;
  var s = new Shoutout({ shoutoutText: shoutoutText, author: req.session.user })
  s.save(function (err, result) {
    if (!err) {
      res.redirect('/')
    } else {
      next(err)
    }
  })
})


app.use('/account', accountRouter)
app.use('/api', apiRouter)

// TODO: Mount api routes at '/api' prefix

// don't put any routes below here!
app.use(function (err, req, res, next) {
  return res.send('ERROR :  ' + err.message)
})

app.listen(process.env.PORT || 3000, function () {
  console.log('App listening on port ' + (process.env.PORT || 3000))
})
