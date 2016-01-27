(function(){
  angular
  .module("map")
  .controller("MapController", [
    "$stateParams",
    "$state",
    "$scope",
    "$interval",
    MapFunction
  ]);

  function MapFunction($stateParams, $state, $scope, $interval){
    var self = this;
    this.getBuses = function() {

    }
    var map;
    this.initMap = function() {
      console.log('asas')
      map = new google.maps.Map(document.getElementById('map'), {
        center: new google.maps.LatLng(40.0000, -98.0000),
        zoom: 8
      });
    }
    this.initMap();
  }
})();
