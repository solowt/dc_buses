(function(){
  angular
  .module("map")
  .controller("MapController", [
    "$stateParams",
    "$state",
    "$scope",
    "mySocket",
    "geolocation",
    MapFunction
  ]);

  function MapFunction($stateParams, $state, $scope, mySocket, geolocation){
    var self = this;
    // ask the back end for an update
    mySocket.emit("giveBuses");
    // declare vars
    this.buses = [];
    this.markers = [];
    this.map;
    this.information = {};
    this.userLoc = {};

    geolocation.getLocation().then(function(data){
      self.userLoc = {lat:data.coords.latitude, long:data.coords.longitude};
      self.initMap();
      self.drawUser();
    });

    // add poly around entire bus system.  make it a square?

    // listen for socket messages
    $scope.$on('socket:busUpdate', function (ev, data) {
      console.log("Got new Buses data");
      self.buses = data.BusPositions;
      self.drawBuses();
    });

    // set all buses on the map
    this.setBuses = function (map) {
      for (var i = 0; i < self.markers.length; i++) {
        self.markers[i].setMap(map);
      }
    }

    // remove all buses from the map
    this.removeBuses = function() {
      self.setBuses(null);
      self.markers = [];
    }

    // get information here for display in info panel
    // call this function every time data is refreshed
    // num buses...
    this.getInfomation = function() {
      return {
        numBuses: self.buses.length
      }
    }

    // draw this and we're basically done!
    this.drawBuses = function() {
      self.removeBuses();
      // console.log(self.markers.length);
      for (var i=0; i<self.buses.length; i++){
        var loc = new google.maps.LatLng(self.buses[i].Lat, self.buses[i].Lon); //change this
        var marker = new google.maps.Marker({
          position: loc,
          // animation: google.maps.Animation.BOUNCE,
          // map: self.map,
          icon: '../assets/train15.png'
          // icon: 'https://storage.googleapis.com/support-kms-prod/SNP_2752125_en_v0'
        });
        self.markers.push(marker);
        // this is the info window for the current marker
        var contentString = "<div>"+
        "<h4>Bus Information</h4>"+
        "<p>Route ID: "+self.buses[i].RouteID+"</p>"+
        "<p>Direction: "+self.buses[i].DirectionText+"</p>"+
        "<p>Destination: "+self.buses[i].TripHeadsign+"</p>"+
        "</div>";


        var infoWindow = new google.maps.InfoWindow();
        google.maps.event.addListener(marker, 'click', (function(marker, i, contentString){
          return function() {
            infoWindow.setContent(contentString);
            infoWindow.open(self.map, marker)
          }
        })(marker, i, contentString));
      }
      self.setBuses(self.map);
      console.log(self.buses.length);
      self.information = self.getInfomation();
    }

    // function to place the user on the map
    this.drawUser = function() {
      var pos = new google.maps.LatLng(self.userLoc.lat, self.userLoc.long);
      var user = new google.maps.Marker({
        position: pos,
        map: self.map,
        icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
      });
    }

    this.initMap = function() {
      self.map = new google.maps.Map(document.getElementById('map'), {
        center: new google.maps.LatLng(self.userLoc.lat, self.userLoc.long),
        zoom: 17,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });
    }
  }
})();
