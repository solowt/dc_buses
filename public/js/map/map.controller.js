(function(){
  angular
  .module("map")
  .controller("MapController", [
    "$stateParams",
    "$state",
    "$scope",
    "mySocket",
    "geolocation",
    "$compile",
    MapFunction
  ]);

  function MapFunction($stateParams, $state, $scope, mySocket, geolocation, $compile){
    console.log("In controller");
    var self = this;
    // ask the back end for an update
    // declare vars
    this.buses = [];
    this.markers = [];
    this.map;
    this.information = {};
    this.userLoc = {};

    geolocation.getLocation().then(function(data){
      self.userLoc = {lat:data.coords.latitude, long:data.coords.longitude};
      self.drawUser();
      mySocket.emit("giveBuses");
    });

    // listen for socket messages
    $scope.$on('socket:busUpdate', function (ev, data) {
      console.log("Got new Buses data");
      self.buses = data.BusPositions;
      if (self.buses){
        self.drawBuses();
      }
    });

    // use google direction service to draw bus route on map
    // trigger on click
    this.getShowRoute = function (index) {
      self.directionsService.route({
        origin: new google.maps.LatLng(self.buses[index].Lat, self.buses[index].Lon),
        destination: self.buses[index].TripHeadsign+", Washington, DC",
        travelMode: google.maps.TravelMode.TRANSIT,
        transitOptions: {modes:[google.maps.TransitMode.BUS]}
      }, function (res, status) {
        if (status === google.maps.DirectionsStatus.OK) {
          // console.log(res);
          self.directionsDisplay.setDirections(res);
        } else {
          console.log("Directions failed: "+status)
        }
      });
    }

    // set all buses on the map
    this.setBuses = function (map) {
      var length = self.markers.length;
      for (var i = 0; i<length; i++) {
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

    this.drawBuses = function() {
      var delayCounter = 0;
      console.log("drawing buses")
      self.removeBuses();
      // console.log(self.markers.length);
      for (var i = 0; i<self.buses.length; i++){
        var loc = new google.maps.LatLng(self.buses[i].Lat, self.buses[i].Lon);

        delayCounter+=self.buses[i].Deviation;

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
        "<p>Deviation from schedule: "+self.buses[i].Deviation+"</p>"
        "</div>";
        // var compiled = $compile(contentString)($scope)
        //not used but interesting

        var infoWindow = new google.maps.InfoWindow();
        google.maps.event.addListener(marker, 'click', (function(marker, i, contentString){
          return function() {
            infoWindow.setContent(contentString);
            infoWindow.open(self.map, marker)
            self.getShowRoute(i);
          }
        })(marker, i, contentString));
      }
      self.information = self.getInfomation();
      self.information.delay = delayCounter/self.buses.length;
      self.setBuses(self.map);
      // console.log(self.buses.length);
    }
    // function to place the user on the map
    this.drawUser = function() {
      var pos = new google.maps.LatLng(self.userLoc.lat, self.userLoc.long);
      var user = new google.maps.Marker({
        position: pos,
        map: self.map,
        icon: "https://maps.google.com/mapfiles/ms/icons/red-dot.png"
      });
      // add route function here
      var userWindow = new google.maps.InfoWindow();
      google.maps.event.addListener(user, 'click', function(){
        userWindow.setContent("<h3>You are here</h3>");
        userWindow.open(self.map, user);
      })
    }

    this.initMap = (function() {
      self.map = new google.maps.Map(document.getElementById('map'), {
        center: new google.maps.LatLng(self.userLoc.lat, self.userLoc.long),
        zoom: 17,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });
      self.directionsService = new google.maps.DirectionsService;
      self.directionsDisplay = new google.maps.DirectionsRenderer({preserveViewport: true});
      self.directionsDisplay.setMap(self.map);
    })()
    // this.initMap();
  }
})();
