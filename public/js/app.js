(function (){
  angular
  .module("dcBus", [
    "ui.router",
    "geolocation",
    "map"
  ])
  .config([
    "$stateProvider",
    RouterFunction
  ])

  function RouterFunction($stateProvider, $locationProvider){
    $stateProvider
    .state("map", {
      url: "/",
      // templateUrl: "js/lines/show.html",
      controller: "MapController",
      controllerAs: "MapModel"
    });
  }
})();
