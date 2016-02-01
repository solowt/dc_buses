var express = require("express");
var cors = require("cors");
var functions = require("./functions/functionlib.js")
var app = express();

var server = require("http").Server(app);
var io = require("socket.io")(server);

app.set('port', (process.env.PORT || 3000));
app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

var allBuses = [];

var busLoop = function(){
  console.log("asasasas")
  functions.getAllBuses().then(function(data){
    allBuses = data;
    console.log("Got bus data.");
    io.emit("busUpdate", allBuses);
    setTimeout(busLoop, 20000);
  });
}


io.on('connection', function(socket){
  busLoop();
  socket.on('giveBuses', function(){
    io.emit("busUpdate", allBuses);
  })
})

app.get('/buses', function(req, res){
  res.json(allBuses);
});

server.listen(app.get('port'), function(){
  console.log("App listening on port", app.get('port'));
});
