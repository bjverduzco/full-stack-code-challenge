var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var index = require('./routes/index');
var groceryRouter = require('./routes/grocery');

var app = express();


app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/', index);
app.use('/grocery', groceryRouter);

var mongoURI = 'mongodb://localhost:27017/groceries';
var MongoDB = mongoose.connect(mongoURI).connection;

MongoDB.on('error', function(err){
  console.log('mongdb connection error,', err);
})

MongoDB.once('open', function(){
  console.log('mongodb conneciton open!');
})

var server = app.listen(3000, function(){
  var port = server.address().port;
  console.log('Listening on port,', port);
  console.log('Press Ctrl-c to quit.');
});
