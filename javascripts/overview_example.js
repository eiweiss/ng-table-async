'use strict';

var app = angular.module('OverviewExample', [ 'ngTableAsync', 'ui.bootstrap' ]);

app.controller('OverviewExampleController', function($scope, $q, $timeout, $window){

  // Clone data array
  var data = _.cloneDeep($window.DATA);

  $scope.tableOptions = {
    pageSize: 7,
    getPage: function(skip, limit){
      var page = data.slice(skip, skip + limit);
      return $q.all([
        data.length,
        page
      ]);
    },
    actions: {
      increment: {
        method : function(user){
          console.log('Incrementing...');
          return $scope.simulateDelay(function(){
            user.counter += 1;
          });
        },
        reload: false
      },
      reset: function(user){
        console.log('Resetting...');
        return $scope.simulateDelay(function(){
          user.counter = 0;
        });
      },
      remove: {
        method : function(user){
          _.remove(data, { id: user.id });
        },
        dialog : {
          templateUrl : '_delete_user_confirm.html',
          params      : function(item){
            return { username: item.email };
          }
        }
      }
    }
  };


});
