'use strict';

var app = angular.module("Application", [
  "ui.router",
  "restangular",
  'ui.bootstrap.tpls',
  'ui.bootstrap'
]);

app.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/state1");

  $stateProvider
    .state('state1', {
      url: "/state1",
      templateUrl: "partials/state1.html"
    })
    .state('state1.list', {
      url: "/list",
      templateUrl: "partials/state1.list.html",
      data: {
        rule: function() {
          return {
            to: "state1.list"
          }
        }
      },
      controller: function($scope) {
        $scope.items = ["A", "List", "Of", "Items"];
      }
    })
    .state('state2', {
      url: "/state2",
      templateUrl: "partials/state2.html",
      resolve: {
        promiseObj:  function(Restangular){
          return Restangular.one("test").get();
        }
      },
      controller: function($scope, promiseObj){
        console.log(promiseObj);
      }
    })
    .state('state2.list', {
      url: "/list",
      templateUrl: "partials/state2.list.html",
      controller: function($scope) {
        $scope.things = ["A", "Set", "Of", "Things"];
      }
    })

});

app.run(function(Restangular, $modal, $rootScope, $state) {

  Restangular.setErrorInterceptor(function(response, deferred, responseHandler) {
    if(response.status === 404) {
      var mod = $modal.open({
        templateUrl: 'myModalContent.html',
        size: "sm"
      });

      return false; // error handled
    }

    return true; // error not handled
  });

});
