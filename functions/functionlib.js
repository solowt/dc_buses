var request = require("request");
var fs = require("fs");
var env = fs.existsSync("./env.js") ? require("../env") : process.env;


module.exports = {
  // function to get all buses-
  // url example: https://api.wmata.com/Bus.svc/json/jBusPositions[?RouteID][&Lat][&Lon][&Radius]
  // this allows you to get buses within a radius of a point - is there a way to use this? or do
  // we just want all buses with every update
  getAllBuses: function(){
    var url = "https://api.wmata.com/Bus.svc/json/jBusPositions?api_key="+env.KEY;
    return new Promise(function(resolve, reject){
      request(url, function(err, res){
        if (!err){
          resolve(JSON.parse(res.body)); // maybe assign this to bus array in index.js and not use bus model
        } else {
          console.log("Error getting trains: "+err);
        }
      });
    });
  }
}
