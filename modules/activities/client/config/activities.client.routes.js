(function () {
  'use strict';

  angular
    .module('activities.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('activities', {
        abstract: true,
        url: '/activities',
        template: '<ui-view/>'
      })
      .state('activities.myActivities', {
        url: '',
        templateUrl: '/modules/activities/client/views/user-activities.client.view.html',
        controller: 'ActivitiesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'activities List'
        }
      });
  }

  // getArticle.$inject = ['$stateParams', 'ArticlesService'];
  /*
  function getArticle($stateParams, ArticlesService) {
    return ArticlesService.get({
      articleId: $stateParams.articleId
    }).$promise;
  }*/

}());
