/**
 * Created by paulhindenberg on 08.02.15.
 */
/**
 * Created by paulhindenberg on 08.02.15.
 */
SAPHelper.controller('ItemDetailCtrl', function($ionicHistory, $ionicPopup, keyboardManager, $scope, $log, SAPHelperService, $state, ConfigService, $stateParams) {
    if(SAPHelperService.getAuthentication() === false && ConfigService.DEVMODE() === true){
        $log.log('ContentBeschaffung im Devmode, kein auth');
        SAPHelperService.getInitialData().then(function(response){
            if(response === true){
                SAPHelperService.setAuthentication();
                $scope.item = SAPHelperService.getItem($stateParams.itemId);
                $scope.master = angular.copy($scope.item);
                $log.log($scope.item);

            }
        })
    }else{
        $log.log('ContentBeschaffung im standardverfahren');
        $scope.item = SAPHelperService.getItem($stateParams.itemId);
        $scope.master = angular.copy($scope.item);
        $log.log($scope.item);
    }

window.scope = $scope;
    $scope.editMode = false;
    $scope.editScopesMode = false;

    $scope.toggleEditMode = function(){
        if($scope.editMode === false){
            $scope.master = angular.copy($scope.item);
        }else{
            $scope.editScopesMode = false;
        }
        $scope.editMode = !$scope.editMode;
    }

    $scope.reset = function() {
        angular.copy($scope.master, $scope.item);
        selectSelectedScopes();
        $scope.editScopesMode = false;
    };

    keyboardManager.bind('meta+s', function() {
        $log.log('Callback cmd+s');
        $scope.save();
    });

    var escCalled = false;
    keyboardManager.bind('esc', function() {
        //um doppelevent zu verhindern
        if(escCalled === false){
            $log.log('Callback esc');
            escCalled= true;
            $scope.leavePage();
        }
    });
    $scope.leavePage = function(){
       // if($scope.master != $scope.item){
        if(!isEqual($scope.item, $scope.master)){
            //hier jetz ein "popup", willste ohne speichern leaven?
            $scope.showLeaveWithoutSavingPopup();
        }else{
            $state.go('items', {reload:true});
            escCalled= false;
        }
    }

    $scope.save = function(withLeave){
        SAPHelperService.saveItem($scope.item).then(function(response){
            $log.log(response);
           if(response == true){
               $scope.editMode = false;
               $scope.editScopesMode = false;
               if(withLeave === true){
                   $state.go('items', {reload:true});
               }
           }else{
               alert('Speichern fehlgeschlagen');
           }
        });
    };


    $scope.showLeaveWithoutSavingPopup = function(){
        var myPopup = $ionicPopup.show({
            template: '',
            title: 'Zurück',
            subTitle: 'Zurück ohne zu speichern?',
            scope: $scope,
            buttons: [
                {
                    text: 'Cancel',
                    onTap: function(e){
                        escCalled= false;
                    }
                },
                {
                    text: 'Verwerfen',
                    onTap: function(e) {
                        $scope.reset();
                        $scope.editMode = false;
                        escCalled= false;
                    }
                },
                {
                    text: '<b>Save</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        $scope.save(true);
                        escCalled= false;
                    }
                }
            ]
        });
    }

    function isEqual(item, master){
        var isEqual = true;
        var attr = Object.getOwnPropertyNames(master);
        angular.forEach(attr, function(value, key){
           if(item[value] !== master[value]){
               if(typeof item[value] === 'object' && item[value].length > 0){
                   $log.log(item[value].length);
                   $log.log(master[value].length);
                   if(item[value].length != master[value].length){
                       isEqual = false;
                       return isEqual;
                   }
                   angular.forEach(item[value], function(value2, key2){
                       var attr2 = Object.getOwnPropertyNames(master[value][key2]);
                       angular.forEach(attr2, function(value3,key3){
                        //   $log.log(value2[value3])
                        //   $log.log(master[value][key2][value3]);
                           if(value2[value3] !== master[value][key2][value3]){
                                isEqual = false;
                               return isEqual;
                           }
                       })
                   })
               }else{
                   isEqual = false;
                   $log.log('NOT EQUAL at:item'+item[value] +'master: ' + master[value])
                   return isEqual;
               }

           }
        })
        /*if(item.name !== master.name){
            isEqual = false;
            return isEqual;
        }
        if(item.longtext !== master.name){
            isEqual = false;
            return isEqual;
        }*/
        return isEqual;

    }

    $scope.toggleEditScopesMode = function(){
        $scope.scopes = SAPHelperService.getScopes();
        selectSelectedScopes();
        $scope.editScopesMode = true;
    }

    function selectSelectedScopes(){
        angular.forEach($scope.scopes, function(value, key){
            value.checked = false;
            angular.forEach($scope.item.scopes, function(value2, key2){
                if(value2.id == value.id){
                    value.checked = true;
                }
            })
        })
    }

    $scope.onScopeCheckboxChanged = function(s){
        if(s.checked === true){
            $scope.item.scopes.push({id: s.id, name: s.name});
        }else{
            angular.forEach($scope.item.scopes, function(value, key){
                if(s.id === value.id){
                    $scope.item.scopes.splice(key,1);
                }
            })
        }
    }

    $scope.deleteItem = function(){
            var confirmPopup = $ionicPopup.confirm({
                title: 'Eintrag löschen',
                template: 'Sicher das du den Eintrag löschen willst?'
            });

            confirmPopup.then(function(res) {
                if(res) {
                    SAPHelperService.deleteItem($scope.item.id).then(function(response){
                        if(response === true){
                            $state.go('items', {reload:true});
                        }else{
                            alert('Löschen fehlgeschlagen');
                        }
                    })
                } else {

                }
            });

    }


})