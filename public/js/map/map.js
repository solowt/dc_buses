"use strict";

(function(){
  angular
  .module("map", [
    "ngResource",
    "btford.socket-io"
  ])
  .factory('mySocket', function(socketFactory){
    var mySocket = socketFactory();
    mySocket.forward("busUpdate");
    return mySocket;
  })
})();
