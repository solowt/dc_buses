(function(){
  angular
  .module("dcBus")
  .controller("MapController", [
    "$stateParams",
    "$state",
    "$scope",
    "$interval",
    MapFunction
  ]);

  function MapFunction($stateParams, $state, $scope, $interval){
    console.log("asasa");
    this.getBuses = function() {

    }

  }
})();
