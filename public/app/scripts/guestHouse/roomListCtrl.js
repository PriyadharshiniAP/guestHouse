(function () {
    'use strict';
var App = angular.module('app');
App.controller('guestHouseroomListCtrl', guestHouseroomListCtrl);
guestHouseroomListCtrl.$inject = ['$scope', '$rootScope','$window', '$timeout','guestHouseMasterService'];
    function guestHouseroomListCtrl($scope, $rootScope, $window, $timeout, guestHouseMasterService) {
        $scope.facility = ['AC', 'TV', 'Free Wifi', 'Kitchen', 'In-house Restaurant', 'Parking Facility', 'Card Payment', 'Power backup', 'Conference Room', 'Banquet Hall', 'CCTV Cameras', 'Dining Area', 'Elevator', 'Swimming Pool', 'Hot Water', 'Bar', 'Wheelchair Accessible', 'Room Heater', 'In Room Safe', 'Mini Fridge', 'Complimentary Breakfast', 'Gym', 'Hair Dryer', 'Laundry', 'Pet Friendly', 'HDTV', 'Spa', 'Wellness Center', 'Electricity', 'Bath Tub', 'Netflix', 'Kindle', 'Coffee Tea Maker', 'Sofa Set', 'Jacuzzi', 'Full Length Mirrror', 'Balcony', 'King Bed', 'Queen Bed', 'Single Bed', 'Intercom', 'Sufficient Room Size', 'Sufficient Washroom'];
        $scope.dateOptsfrom = {
            dateFormat: 'd/m/Y',
            minDate: "today",
            disable: ["18/01/2019", "22/01/2019", "30/01/2019"]
        }

        $scope.dateOptsto = {
            dateFormat: 'd/m/Y',
            minDate: "today",
            disable: ["18/01/2019", "22/01/2019", "30/01/2019"]
        }
      
        $scope.city = ['Coimbatore', 'Karur', 'Tiruppur', 'Madurai', 'Salem'];

        $scope.state = ['Tamil Nadu', 'Andhra Pradesh', 'Bihar', 'Haryana', 'Manipur'];
        $scope.roomrequest = {};
        $scope.roomrequests = [];
        $scope.roomType = [];
        function loadInitialRoomType() {
            guestHouseMasterService.getAllRoomTypes(function (err, res) {
                if (!err) {
                    $scope.roomType = res;
                }
            })
        }
        loadInitialRoomType();
        var a = moment([2007, 5, 27]);
        var b = moment([2007, 5, 1]);
        //var duration = moment.duration(a.diff(b))
        //console.log(duration,'days');
        //console.log(a.diff(b, 'days'));
       
        $scope.saveRoomRequest = function () {
            guestHouseMasterService.addRoomRequest($scope.roomrequest, function (err, res) {
                if (!err) {
                    $scope.roomrequests.push($scope.roomrequest);
                  
                    var checkin = moment($scope.roomrequest.checkin,"DD/MM/YYYY");
                    console.log(checkin);
                    var checkout = moment($scope.roomrequest.checkout,"DD/MM/YYYY");
                    var duration = checkin.diff(checkout,'days');
                    console.log(Math.abs(duration));

                    // console.log(checkout);       
                    // console.log(checkin.diff(checkout,'days')); 
                }
            })
        }
        //console.log("hello");
        $scope.roomCategoryType = [];
        $scope.filterRoomName = [];
        $scope.room = [];

   
         $scope.roomCategory = function (event) {
            if ($scope.roomCategoryType.length > 0) {
                if ($.inArray(event.roomname, $scope.roomCategoryType) < 0)
                    return;
            }
            return event;
        }
        $scope.roomname = function (event) {
            var i = $.inArray(event, $scope.roomCategoryType);
            
            if (i > -1) {
                $scope.roomCategoryType.splice(i, 1);
            } else {
                $scope.roomCategoryType.push(event);
            }
        }
        $scope.roomFacilities = function (event) {
            var i = $.inArray(event, $scope.roomCategoryType);
            
            if (i > -1) {
                $scope.roomCategoryType.splice(i, 1);
            } else {
                $scope.roomCategoryType.push(event);
            }
        }
        $scope.facilityFilters = function (event) {
            if ($scope.filterRoomName.length > 0) {
                if ($.inArray(event.facilities, $scope.filterRoomName) < 0)
                    return;
            }
            return event;
        }
        // $scope.roomNameSelector = function(str) {
        //     $scope.room =[];
        //     if(str !=""){
        //         for (var j=0; j<$scope.rooms.length; j++) {
        //             if ($scope.roomType[j].roomName.match(str)){
        //                 $scope.room.push($scope.roomType[j]);
        //             }
        //         }
                
        //     }else{
        //         $scope.room = $scope.roomType.slice();
        //     }
        // }

        // $scope.roomNameFilters = function (event) {
        //     if ($scope.filterRoomName.length > 0) {
        //         if ($.inArray(event.description, $scope.filterRoomName) < 0)
        //             return;
        //     }
        //     return event;
        // }


    }

})();     
