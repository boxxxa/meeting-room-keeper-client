'use strict';
angular.module('keeperApp', ['ui.router','ngResource'])
        .config(function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                    .state('app', {
                        url: '/',
                        views: {
                            'header': {
                                templateUrl: 'views/header.html'
                            },
                            'content': {
                                templateUrl: 'views/map.html'
                            },
                            'footer': {
                                templateUrl: 'views/footer.html'
                            }
                        }
                    })
                    .state('app.items', {
                        url: 'items',
                        views: {
                            'content@': {
                                templateUrl: 'views/items.html'
                            }
                        }
                    })
                    // route for the contactus page
                    .state('app.places', {
                        url: 'places',
                        views: {
                            'content@': {
                                templateUrl: 'views/places.html'
                            }
                        }
                    })

                    // route for the menu page
                    .state('app.menu', {
                        url: 'menu',
                        views: {
                            'content@': {
                                templateUrl: 'views/menu.html'
//                                ,controller: 'MenuController'
                            }
                        }
                    })

                    // route for the dishdetail page
                    .state('app.dishdetails', {
                        url: 'menu/:id',
                        views: {
                            'content@': {
                                templateUrl: 'views/dishdetail.html'
//                                ,controller: 'DishDetailController'
                            }
                        }
                    });
            $urlRouterProvider.otherwise('/');
        })

        ;