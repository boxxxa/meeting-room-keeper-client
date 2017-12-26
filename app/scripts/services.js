'use strict';
angular.module('keeperApp')
        .constant("baseURL", "https://meeting-room-keeper.eu-gb.mybluemix.net/api/")
        //.constant("baseURL", "http://localhost:3000/")
        .service('itemFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
                this.getItems = function () {
                    return $resource(baseURL + "items/:id", null, {'update': {method: 'PUT'}});
                };
            }])
        .service('mapFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
                this.getOngoingItems = function () {
                    return $resource(baseURL + "items/now", null);
                };
            }])
        .service('placesFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
                this.getPlaces = function () {
                    return $resource(baseURL + "places", null);
                };
            }])
        ;