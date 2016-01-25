var express = require("express");
var cors = require("cors");
var functions = require("./functions/functionlib.js")
var app = express();

app.set('port', (process.env.PORT || 3000));
app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));


// array to hold all buses, will be updated in a loop eventually
var allBuses = [];

app.get('/', function(req, res){
  functions.getAllBuses().then(function(data){
    res.json(data);
  })
});

app.listen(app.get('port'), function(){
  console.log("App listening on port", app.get('port'));
});
