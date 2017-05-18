(function () {
  'use strict';

  // Setting up route
  angular
    .module('users.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.activities', {
        url: '/activities',
        templateUrl: '/modules/activities/client/views/admin-usersAndActivities.client.view.html',
        controller: 'ActivitiesController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Users List'
        }
      });

    getUser.$inject = ['$stateParams', 'AdminService'];

    function getUser($stateParams, AdminService) {
      return AdminService.get({
        userId: $stateParams.userId
      }).$promise;
    }
  }
}());
