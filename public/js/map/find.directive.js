(function(){
  angular
  .module("map")
  .directive("find", [
    "$state",
    findDirFunction
  ])

  function findDirFunction($state, $watch){
    console.log("Directive!")

    return {
      templateUrl: "js/map/find.html",
      replace: true,
      restrict: "E",
      scope: {
        buses: '=',
        vm: '='
      },
      link: function(scope){
        scope.selectedRoute = '';
        scope.routes = []; // total array of routes
        scope.$watchCollection("buses", function(){
          if (scope.buses.length >0){
            scope.uniqRoutes();            
          }
        });
        // get list of routes, probably invoke this right away
        scope.uniqRoutes = function(){
          scope.routes = [];
          var numBuses = scope.buses.length;
          for (var i=0; i<numBuses; i++){
            if (scope.routes.indexOf(scope.buses[i].RouteID) == -1){
              scope.routes.push(scope.buses[i].RouteID);
            }
          }
        }
        scope.sendRoute = function(){
          scope.vm.setFilter(scope.selectedRoute);
        }
        scope.selectRoute = function(){
          scope.selectedRoute = $('.selector').val();
          scope.sendRoute();
        }
      }
    }
  }
})();
