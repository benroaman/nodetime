var express = require('express'), // include the dependency express
    app = express();

app.get('/api/friends', function (req, res) { // req is the request object, sent by data, res is how you respond to req
  res.send('Hello, world!');
});

// Start the server
var server = app.listen(process.env.PORT || 3000, function () {
 var host = server.address().address,
     port = server.address().port;

 console.log('Feclass listening at http://%s:%s', host, port);
});
