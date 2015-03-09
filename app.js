var express = require('express'), // include the dependency express
    bodyParser = require('body-parser'),
    app = express();
    friends = [{
      name: 'James',
      sex: 'm'
    }, {
      name: 'Garrett',
      sex: 'm'
    }, {
      name: 'Meredith',
      sex: 'f'
    }];

app.use(bodyParser.json());

app.get('/api/friends', function (req, res) { // req is the request object, sent by data, res is how you respond to req
  res.json(friends);
});

// Start the server
var server = app.listen(process.env.PORT || 3000, function () {
 var host = server.address().address,
     port = server.address().port;

 console.log('Feclass listening at http://%s:%s', host, port);
});
