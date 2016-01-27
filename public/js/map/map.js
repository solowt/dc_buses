"use strict";

(function(){
  angular
  .module("map", [
    "ngResource",
    "geolocation",
    "btford.socket-io"
  ])
  .factory('mySocket', function(socketFactory){
    var mySocket = socketFactory();
    mySocket.forward("busUpdate");
    return mySocket;
  })
})();
