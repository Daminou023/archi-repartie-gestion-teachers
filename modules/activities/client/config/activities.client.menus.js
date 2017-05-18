(function () {
  'use strict';

  angular
    .module('activities')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Activities',
      state: 'activities',
      type: 'dropdown',
      roles: ['teacher']
    });

    menuService.addSubMenuItem('topbar', 'activities', {
      title: 'My Activities',
      state: 'activities.myActivities',
      roles: ['teacher']
    });
  }
}());
