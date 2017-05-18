(function () {
  'use strict';

  angular
    .module('users.admin')
    .controller('ActivitiesController', ActivitiesController);

  ActivitiesController.$inject = ['$scope','$http', '$filter', 'AdminService'];

  function ActivitiesController($scope, $http, $filter, AdminService) {
    var vm = this;
    var selectedTeacher;
    
    vm.users = [];
    vm.selectTeacher = selectTeacher;
    vm.populateActivities = populateActivities;
    vm.editTeacherActivities = editTeacherActivities;
    vm.calculateHours = calculateHours;
    vm.save = save;

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

    AdminService.query(function (data) {
      vm.users = data;
      getActivities();// vm.users.forEach(user => {vm.populateActivities(user, user.activities)});
    });

    function getActivities() {
      $http.get('http://172.17.10.34:3000/api/activities')
      .success( function(res) {
          console.log('succes', res);
          vm.activities = res.data;
          vm.users.forEach(user=> {vm.populateActivities(user)});
         })
      .error( function(res) {
          vm.title = "My activities (offline)";
          vm.users.forEach(user=> {vm.populateActivities(user)});
        });
    }

    function save() {
      $http.put('/api/updateUsers', { 'users': vm.users }).success(successCallback);

      function successCallback(res) {
        console.log(res);
        alert('Success! users updated.');
      }
    }

    function matches(id) {
      vm.activities.forEach(activity => { 
        console.log(activity.id === id);
        return activity.id === id});
    }

    function selectTeacher(user) {
      vm.selectedTeacher = user;
    }

    function populateActivities(user) {
      console.log(user.activities);
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

    function editTeacherActivities(checkbox) {
      if (!vm.selectedTeacher.activities.includes(checkbox)) {
        vm.selectedTeacher.activities.push(checkbox);}
      else {
        vm.selectedTeacher.activities = vm.selectedTeacher.activities.filter(x => x !== checkbox);
      }
      calculateHours(vm.selectedTeacher);
      console.log(vm.selectedTeacher.activities);
    }
  }
}());