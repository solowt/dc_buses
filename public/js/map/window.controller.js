(function(){
  angular
  .module("map")
  .controller("WindowController", [
    "$stateParams",
    "$state",
    "$scope",
    "mySocket",
    "geolocation",
    WindowFunction
  ]);

  function WindowFunction($stateParams, $state, $scope, mySocket, geolocation){
    console.log("ASASSAS")
    this.test = function() {
      console.log('a');
    }
  }
})();
