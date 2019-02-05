(function () {
    'use strict';
    var App = angular.module('app');
    App.controller('addTariffCtrl', addTariffCtrl);
    addTariffCtrl.$inject = ['$scope', 'guestHouseMasterService'];
    function addTariffCtrl($scope, guestHouseMasterService) {
        $scope.newTariff = {};
        $scope.newTariff.features = [];
        $scope.dataMode = "ADD";
        function loadInitialTariff() {
            guestHouseMasterService.getAllTariff(function (err, res) {
                if (!err) {
                    $scope.mastersData = res;
                  
                }
        
            })
        }
            loadInitialTariff()
            $scope.saveNewTariff = function () {
                     $("#basic-modal").modal('hide');
                     $scope.masterData.values.forEach(function (item,index) {
                         $scope.masterData.values [index]= item.toUpperCase();
                     })
                     guestHouseMasterService.createMasterData($scope.masterData, function (err, res) {
                         if (!err) {
                             $scope.mastersData.push(res);
                         }
     
                     })
                    }         
       
    }
});