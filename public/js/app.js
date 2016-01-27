(function (){
  angular
  .module("dcBus", [
    "ui.router",
    "map"
  ])
  .config([
    "$stateProvider",
    RouterFunction
  ])

  function RouterFunction($stateProvider, $locationProvider){
    // $stateProvider
    // .state("map", {
    //   url: "/jelp",
    //   // templateUrl: "js/lines/show.html",
    //   controller: "MapController",
    //   controllerAs: "MapModel"
    // });
  }
})();
