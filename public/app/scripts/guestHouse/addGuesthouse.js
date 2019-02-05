(function () {
    'use strict';
    var App = angular.module('app');
    App.controller('addGuesthouseCtrl', addGuesthouseCtrl);
    addGuesthouseCtrl.$inject = ['$scope', '$rootScope', 'guestHouseMasterService', '$stateParams'];
    function addGuesthouseCtrl($scope, $rootScope, guestHouseMasterService, $stateParams) {
        console.log($stateParams)
        $scope.newGuestHouse = {};
        $scope.guestHouse = [];
        $scope.newRoomType = {};
        $scope.roomType = [];
        $scope.facility = ['AC', 'TV', 'Free Wifi', 'Kitchen', 'In-house Restaurant', 'Parking Facility', 'Card Payment', 'Power backup', 'Conference Room', 'Banquet Hall', 'CCTV Cameras', 'Dining Area', 'Elevator', 'Swimming Pool', 'Hot Water', 'Bar', 'Wheelchair Accessible', 'Room Heater', 'In Room Safe', 'Mini Fridge', 'Complimentary Breakfast', 'Gym', 'Hair Dryer', 'Laundry', 'Pet Friendly', 'HDTV', 'Spa', 'Wellness Center', 'Electricity', 'Bath Tub', 'Netflix', 'Kindle', 'Coffee Tea Maker', 'Sofa Set', 'Jacuzzi', 'Full Length Mirrror', 'Balcony', 'King Bed', 'Queen Bed', 'Single Bed', 'Intercom', 'Sufficient Room Size', 'Sufficient Washroom'];
        $scope.dataMode = "ADD";
        $scope.imageAttachment = {
            dzOptions: {
                url: "guestHouse/file/upload",
                method: "put",
                parallelUploads: 1,
                addRemoveLinks: true,
                acceptedFiles: 'image/jpeg, images/jpg, image/png',
                dictDefaultMessage: 'Click to add or drop photos',
                autoProcessQueue: true,
                createImageThumbnails: true,
                previewContainer: true,
                dictResponseError: 'Could not upload this file',
                paramName: function () {
                    return "fileAttachment";
                },
                renameFile: function (file) {
                    file.upload.filename = file.name;
                },
            },
            dzCallbacks: {
                init: function () {
                    this.on("addedfile", function (file) {
                    });
                },
                "sending": function (file, xhr, formData) {
                },
                "addedfile": function (file) {
                    console.info('File added from dropzone .', file);
                    $scope.displayFile = file.name;
                },
                "removedfile": function (file) {
                    console.info('File removed from Server .', file);
                    $scope.removeFile(file.id);
                    removeFile(file);
                },
                "success": function (file, xhr) {
                    console.info(file);
                    file.id = xhr[0].id;
                    file.xhr = xhr;
                    if (!$scope.newGuestHouse) {
                        $scope.newGuestHouse = {};
                    }
                    $scope.newGuestHouse.fileAttachmentDetails = {
                        "id": file.id,
                        "contentType": file.type,
                        "originalName": file.name,
                        "imageUrl": "guestHouse/loadimg/" + file.id + "/" + file.name + "/" + file.type
                    };
                    //console.info("details",$scope.imageInput.fileAttachmentDetails);
                },
                "error": function (file) {
                },
                "complete": function (file) {
                }
            },
            dzMethods: {

            }
        };
        $scope.removeFile = function (id) {
            $scope.removeDirtyAttachment(id)
            $scope.newGuestHouse = {};
            $scope.newGuestHouse.fileAttachmentDetails = {};
        }
        $scope.removeDirtyAttachment = function (id) {
            $scope.dirtyFileRemoved = undefined;
            guestHouseMasterService.removeDirtyAttachment(id, function (err, res) {
                if (!err) {
                    $scope.dirtyFileRemoved = true;
                    return;
                }
                else {
                    $scope.dirtyFileRemoved = false;
                    return;
                }
            })
        }
        $scope.saveGuestHouse = function () {
            guestHouseMasterService.createGuestHouse($scope.newGuestHouse, function (err, res) {
                if (!err) {
                    $scope.guestHouse.push($scope.newGuestHouse);
                }
            })
        }
        //  $scope.setguestHouseForEdit = function (guestHouse) {
        //      $scope.newGuestHouse = JSON.parse(JSON.stringify(guestHouse));
        //      $scope.dataMode = "EDIT";

        //  }
        // setguestHouseForEdit(guestHouse);
        // $scope.updateGuestHouse = function (guestHouse) {
        //     // $scope.guestHouse = JSON.parse(JSON.stringify(guestHouse));
        //     // $("#information").show();
        //     delete $scope.newGuestHouse.$$hashKey
        //     guestHouseMasterService.updateGuestHouse($scope.newGuestHouse._id, $scope.newGuestHouse, function (err, res) {
        //         if (!err) {
        //             var index = $scope.guestHouseMasters.findIndex(function (data) {
        //                 return data._id == $scope.newGuestHouse._id;
        //             });
        //             $scope.guestHouseMasters[index] = $scope.newGuestHouse;
        //             //  $('#GuestHouseModal').modal('hide');
        //         }
        //     });
        // }

        //Room Type
        $scope.dateOpts1 = {
            dateFormat: 'd-m-Y',
        };
        $scope.roomTypeImage = {
            dzOptions: {
                url: "guestHouse/file/uploadRoomType",
                method: "put",
                parallelUploads: 1,
                addRemoveLinks: true,
                acceptedFiles: 'image/jpeg, images/jpg, image/png',
                dictDefaultMessage: 'Click to add or drop photos',
                autoProcessQueue: true,
                createImageThumbnails: true,
                previewContainer: true,
                dictResponseError: 'Could not upload this file',
                paramName: function () {
                    return "roomTypeAttachment";
                },
                renameFile: function (file) {
                    file.upload.filename = file.name;

                },

            },

            dzCallbacks: {
                init: function () {
                    this.on("addedfile", function (file) {
                    });
                },
                "sending": function (file, xhr, formData) {
                },
                "addedfile": function (file) {
                    console.info('File added from dropzone .', file);
                    $scope.displayFile = file.name;
                },
                "removedfile": function (file) {
                    console.info('File removed from Server .', file);
                    $scope.removeRoomTypeFile(file.id);
                    removeRoomTypeFile(file);
                },
                "success": function (file, xhr) {
                    file.id = xhr[0].id;
                    file.xhr = xhr;
                    if (!$scope.newRoomType) {
                        $scope.newRoomType = {};
                    }
                  
                    $scope.newRoomType.roomTypeAttachmentDetails = {
                        "id": file.id,
                        "contentType": file.type,
                        "originalName": file.name,
                        "imageUrl": "guestHouse/loadimg/" + file.id + "/" + file.name + "/" + file.type
                    };
                },
                "error": function (file) {

                },
                "complete": function (file) {
                }
            },
            dzMethods: {

            }
        };
        $scope.removeRoomTypeFile = function (id) {
            $scope.removeRoomTypeAttachment(id)
            $scope.newRoomType = {};
            $scope.newRoomType.fileAttachmentDetails = {};
        }
        $scope.removeRoomTypeAttachment = function (id) {
            $scope.dirtyFileRemoved = undefined;
            guestHouseMasterService.removeRoomTypeAttachment(id, function (err, res) {
                if (!err) {
                    $scope.dirtyFileRemoved = true;
                    return;
                }
                else {
                    $scope.dirtyFileRemoved = false;
                    return;
                }
            })
        }
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
        function loadInitialRoomType() {
            guestHouseMasterService.getAllRoomTypes(function (err, res) {
                if (!err) {
                    $scope.roomType = res;
                }
            })
        }
        loadInitialRoomType();
        $scope.saveRoomType = function () {
            $scope.dataMode = "ADD";
            $('#addRoomType').modal("hide");
            guestHouseMasterService.createRoomType($scope.newRoomType, function (err, res) {
                if (!err) {
                    $scope.roomType.push($scope.newRoomType);
                }
            })
        }
        $scope.editRoomType = function (rooms) {
            $scope.dataMode = "EDIT";
            $('#addRoomType').modal("show");
            $scope.newRoomType = JSON.parse(JSON.stringify(rooms));

        }
        $scope.updateRoomType = function () {
            delete $scope.newRoomType.$$hashKey
            guestHouseMasterService.updateRoomType($scope.newRoomType._id, $scope.newRoomType, function (err, res) {
                if (!err) {
                    var index = $scope.roomType.findIndex(function (data) {
                        return data._id == $scope.newRoomType._id;
                    });
                    $scope.roomType[index] = $scope.newRoomType;
                    $('#addRoomType').modal('hide');
                }
            });
        }
        $scope.removeRoomType = function (index) {
            $scope.newRoomType.splice(index, 1);
        }

        $scope.confirmModal = function (index) {
            $("#confirmModal").modal("show");
            $scope.deleteIndex = index;
           // $scope.newRoomType.splice(index, 1);
        }
        $scope.deleteRoomTypeSure = function () {
            // guestHouseMasterService.deleteRoomType($scope.deleteIndex, function (err, res) {
            // })
            // $scope.roomType.splice($scope.deleteIndex, 1);
            // $("#confirmModal").modal('hide');
            guestHouseMasterService.deleteRoomType($scope.deleteIndex, function (err, res) {
                if (!err) {
                
                    var index = $scope.roomType.findIndex(function (data){
                         return data._id == roomType._id;
                });
                $scope.roomType.splice($scope.deleteIndex, 1);
                $("#confirmModal").modal('hide');
            }            
           
        })

        }
    //     guestHouseMasterService.deleteRoomTypeSure($scope.deleteIndex, function (err, res) {
    //         if (!err) {
            
    //             var index = $scope.roomType.findIndex(function (){
    //                  return data._id == newRoomType._id;
    //         });
    //     }            
    //     $scope.roomType.splice($scope.deleteIndex, 1);
    //     $("#confirmModal").modal('hide');
    // })

        ///////////FLOORS AND ROOMS//////////////
        var i = 0;
       
        $scope.startingNumber = [];
        $scope.numberDigit =[];
        $scope.roomNumber = [];
   
          $scope.roomCounts = [];
           $scope.roomCount = function(index, count){
               
               $scope.roomCounts[index] = [];
               $scope.roomNumber[index] ={};
               $scope.roomNumber[index].room = [];
   
               for(i=0; i < count; i++ ){
                   $scope.roomCounts[index].push(i);
                   $scope.roomNumber[index].room.push(i);
                   $scope.roomNumber[index].room[i] = i+1;
               }
               //alert( $scope.roomNumber[index].room.length)
            //    if(!$scope.new){
            //        $scope.new ={};
            //    }
            //    $scope.new ={};
               $scope.startingNumber[index] = 1;
               $scope.numberDigit[index] = 1;
   
               $scope.roomNoDigit(index);
               $scope.roomStartingNumber(index);
               
           }
   
           function pad(n, width, z) {
               z = z || '0';
               n = n + '';
               return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
           }
   
           $scope.roomNoDigit = function(index){
             
               var digit = $scope.roomNumber[index].room.length
   
               for(i = 0; i < digit && digit != 0; i++){
                   $scope.roomNumber[index].room[i] = pad(parseInt($scope.new.startingNumber[index]) + parseInt(i), parseInt($scope.new.numberDigit[index]), 0 )
               }
              
           }
   
           $scope.roomStartingNumber = function (index) {
   
              
               var number = $scope.roomNumber[index].room.length;
   
               for(i = 0; i < number && number != 0; i++){
                   $scope.roomNumber[index].room[i] = pad(parseInt($scope.new.startingNumber[index]) + parseInt(i), parseInt($scope.new.numberDigit[index]), 0 )
               }
           }
   
           //Add New Floor
           $scope.floors = [];
           $scope.addNewFloor = function () { //Add
               var itemIndex = 0; 
               if ($scope.floors.length) {
                   itemIndex = ($scope.floors[$scope.floors.length - 1].itemIndex) + 1;
               }
               $scope.floors.push({itemIndex : itemIndex})
           }
        //Dropzone
        //  $scope.dzOptions = {
        //     url : '/alt_upload_url',
        //     thumbnail: false,
        //     acceptedFiles : 'image/jpeg, images/jpg, image/png',
        //     addRemoveLinks : true,
        //     dictDefaultMessage : 'Click to add or drop photos',
        //     autoProcessQueue : false
        // };
        $scope.new = {};
        $scope.floorsandrooms = [];
        $scope.saveFloorsandRooms = function () {
            guestHouseMasterService.createFloorsandRooms($scope.new, function (err, res) {
                if (!err) {
                    $scope.floors.push($scope.new);

                }
            })
        }
    }
})();                   
