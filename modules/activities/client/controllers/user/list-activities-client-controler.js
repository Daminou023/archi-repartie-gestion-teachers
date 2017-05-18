(function () {
  'use strict';

  angular
    .module('activities')
    .controller('ActivitiesListController', ActivitiesListController);

  ActivitiesListController.$inject = ['$http', '$scope', 'Authentication'];

  function ActivitiesListController($http, $scope, authentication) {
    
    var vm = this;
    vm.populateActivities = populateActivities;
    vm.calculateHours = calculateHours;
    vm.getActivities = getActivities;
    vm.title = "My activities";

    vm.activities = [
      { "id":1,
        "code":"EI02",
        "name":"Informatique",
        "hours":8
      },
      { "id":2,
        "code":"MA01",
        "name":"Mathématiques",
        "hours":4
      },  
      { "id":3,
        "code":"PH55",
        "name":"Physique",
        "hours":6
      }, 
      { "id":11,
        "code":"CH66",
        "name":"Chimie",
        "hours":2
      },
      { "id":22,
        "code":"AR88",
        "name":"Art du spectacle",
        "hours":2
      },
      { "id": 33,
        "code":"DB69",
        "name":"Bases de données",
        "hours":6
      }
    ];

	$http.get('/api/users/me').success(userSuccessCallback);   
	function userSuccessCallback(res) {
        vm.user = res;
        getActivities();
     }

    function getActivities() {
    	$http.get('http://172.17.10.34:3000/api/activities')
    	.success( function(res) {
    		console.log(res);
    		vm.activities = res.data;
    		vm.populateActivities(vm.user)
    	})
    	.error( function(res) {
    		vm.title = "My activities (offline)";
    		vm.populateActivities(vm.user);
    	});
    }

    function populateActivities(user) {
      console.log(user);
      if (user.activities.length <= 0) {
      	console.log('no activities');
        return;
      }
      user.activities = vm.activities.filter(activity => {return user.activities.includes(activity.id)});
      calculateHours(user);
    }

    function calculateHours(user){
      user.totalHours = user.activities.map(activity => activity.hours).reduce((prev,curr) => prev+curr ,0);
    }
  }
}());


    