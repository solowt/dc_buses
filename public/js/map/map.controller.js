(function(){
  angular
  .module("map")
  .controller("MapController", [
    "$stateParams",
    "$state",
    "$scope",
    "mySocket",
    MapFunction
  ]);

  function MapFunction($stateParams, $state, $scope, mySocket){
    var self = this;
    mySocket.emit("giveBuses");
    this.buses = [];

    $scope.$on('socket:busUpdate', function (ev, data) {
      console.log("Got new Buses data");
      self.buses = data;
      self.drawBuses();
    });

    // draw this and we're basically done!
    this.drawBuses = function() {
      setMapOnAll(null); // remove current markers from map
      for (var i=0; i<self.buses.length; i++){
        var loc = new google.maps.LatLng(38.9047, -77.0164); //change this
        var marker = new google.maps.Marker({
          position: loc,
          animation: google.maps.Animation.BOUNCE,
          map: map,
          icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
        });
      }
    }
    var map;
    this.initMap = function() {
      map = new google.maps.Map(document.getElementById('map'), {
        center: new google.maps.LatLng(38.9047, -77.0164),
        zoom: 13
      });
    }
    this.initMap();
    this.drawBuses();
    console.log(map);
  }
})();
