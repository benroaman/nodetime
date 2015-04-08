var express = require('express'), // include the dependency express
    bodyParser = require('body-parser'),
    app = express();
    Nedb = require('nedb'),
    db = new Nedb();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/src'));
app.use('/dist', express.static(__dirname + '/dist'));

app.get('/api/friends', function (req, res) { // req is the request object, sent by data, res is how you respond to req
  db.find({}).sort({ sortName: 1 }).exec(function (err, friends) {
   res.json(friends);
 });
});

app.get('/api/friends/names', function (req, res) {
  db.find({}, { lastName: 1, firstName: 1 }, function (err, names) { // using projections to limit returned fields
   res.json(names);
 });
});

app.get('/api/friends/:id', function (req, res) { // find a single friend by id
  db.find({ _id: req.param('id') }, function (err, friend) {
   res.json(friend);
 });
});

app.put('/api/friends/:id', function (req, res) {
  var friendUpdate = req.body;
  friendUpdate.sortName = friendUpdate.lastName.toLowerCase() + friendUpdate.firstName.toLowerCase();
  db.update({ _id: req.param('id') }, friendUpdate, {}, function(err, numReplaced, newDoc) { // replace friend with updated version
    res.json(newDoc);
  });
});

app.put('/api/friends/:id/favorite', function (req, res) {
  db.update({ _id: req.param('id') }, { $set: { isFavorite: req.body.isFavorite } }, {}, function(err, numReplaced, newDoc) {
    res.json(newDoc);
  });
});

app.delete('/api/friends/:id', function (req, res) {
  db.remove({ _id: req.param('id') }, {});
})

app.post('/api/friends', function (req, res) {

  var friend = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    sortName: req.body.lastName.toLowerCase() + req.body.firstName.toLowerCase(),
    hometown: req.body.hometown,
    occupation: req.body.occupation,
    email: req.body.email,
    phone: req.body.phone,
    isFavorite: false,
    sex: req.body.sex
  };

  db.insert(friend, function (err, friendRecord) {
    res.json(friendRecord);
  });

})

// Start the server
var server = app.listen(process.env.PORT || 3000, function () {
 var host = server.address().address,
     port = server.address().port;

 console.log('Feclass listening at http://%s:%s', host, port);
});
