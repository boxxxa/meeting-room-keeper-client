'use strict';
angular.module('keeperApp')

        .controller('ItemsController', ['$scope', 'itemFactory', function ($scope, itemFactory) {
                $scope.error = true;
                $scope.message = "Loading ...";
                $scope.items = itemFactory.getItems().get()
                        .$promise.then(
                                function (response) {
                                    $scope.items = response.items;
                                    $scope.error = false;
                                },
                                function (response) {
                                    $scope.message = "Error: " + response.status + " " + response.statusText;
                                }
                        );

            }])
        .controller('MapController', ['$scope', 'mapFactory', 'itemFactory', 'placesFactory', '$state', '$timeout',
            function ($scope, mapFactory, itemFactory, placesFactory, $state, $timeout) {
                $scope.error = true;
                $scope.message = "Loading ...";
                $scope.newItem = {};
                
                function initNewItem() {
                    var d = new Date();
                    var s = d.toISOString().split('.')[0] + "Z";
                    d.setHours(d.getHours() + 1);
                    var e = d.toISOString().split('.')[0] + "Z";
                    $scope.newItem = {
                        name: "",
                        description: "",
                        start_date: s,
                        end_date: e,
                        user_id: 1,
                        place_id: 1,
                        item_type: 1
                    };
                }
                
                initNewItem();
                
                $scope.places = placesFactory.getPlaces().get()
                        .$promise.then(
                                function (response) {
                                    $scope.places = response.places;
                                    console.log($scope.places);
                                },
                                function (response) {
                                    console.log("Error: " + response.status + " " + response.statusText);
                                }
                        );
                $scope.items = mapFactory.getOngoingItems().get()
                        .$promise.then(
                                function (response) {
                                    $scope.items = response.items;
                                    $scope.error = false;
                                },
                                function (response) {
                                    $scope.message = "Error: " + response.status + " " + response.statusText;
                                }
                        );
                $scope.reloadRoute = function () {
                    $state.reload();
                };
                $scope.setRoomBusy = function (roomID) {
                    angular.element(document.querySelector("#" + roomID)).addClass("busyRoom");
                };
                $scope.setRoomTitle = function (item) {
                    angular.element(document.querySelector("#" + item.place.name + '_title'))
                    .text(item.place.name + "\n" + item.name + "\n" + item.description);
                };
                $scope.deleteItem = function (id) {
                    if (confirm('Do you want to delete this event?'))
                    {
                        console.log('Delete item id', id);
                        itemFactory.getItems().delete({id: id})
                                .$promise.then(
                                        function (response) {
                                            console.log(response.message);
                                            $state.reload();
                                            //$scope.error = false;
                                        },
                                        function (response) {
                                            console.log(response, "Error: " + response.status + " " + response.statusText);
                                        }
                                );
                    }
                };
                $scope.showAddItemModal = function () {
                    $('#addItemModal').modal('show');
                };
                $scope.hideAddItemModal = function () {
                    $('#addItemModal').modal('hide');
                };
                $scope.addNewItem = function () {
                    console.log($scope.newItem);
                    $timeout(function () {
                        $('#addItemModal').modal('hide');
                        $('.modal-backdrop').remove();
                    }, 0);
                    
                    itemFactory.getItems().save($scope.newItem)
                            .$promise.then(
                                    function (response) {
                                        console.log(response.message);
                                        $state.reload();
                                        initNewItem();
                                        //$scope.error = false;
                                    },
                                    function (response) {
                                        console.log(response, "Error: " + response.status + " " + response.statusText);
                                        alert(response.data.message);
                                    }
                            );


                };

            }])
        .filter('localDateTime', function () {
            return function (date) {
                var d = new Date(date);
                return d.toLocaleString();
            };
        })

        ;