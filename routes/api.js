var express = require('express')
var router = express.Router();
var Shoutout = require('../models/shoutout.js')

router.get('/getShoutouts', function (req, res, next) {
  shoutouts = Shoutout.find({}, function (err, result) {
    if (err) next(err)
    res.json({ 
      shoutouts: result, 
      author: req.session.user 
    })
  })
})

router.post('/updateShoutout', function (req, res, next) {
  var { shoutoutText } = req.body; // ES6 shorthand
  var author = req.session.user;
  var s = new Shoutout({ shoutoutText, author }) // ES6 shorthand
  s.save(function (err, result) {
    if (err) next(err);
    res.json({ status: 'OK' })
  })
})

router.post('/addComment', function (req, res, next) {
	var { comment, sid } = req.body
	Shoutout.findById(sid, function (err, question) {
		shoutout.comment = comment;
		shoutout.save(function (saveErr, result) {
			if (saveErr) next(saveErr);
			res.json({ success: 'OK'})
		})
	})
})

module.exports = router;

