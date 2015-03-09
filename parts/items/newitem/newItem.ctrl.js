/**
 * Created by paulhindenberg on 09.02.15.
 */
SAPHelper.controller('NewItemCtrl', function($scope, $log, SAPHelperService, $state, ConfigService) {
    if(SAPHelperService.getAuthentication() === false && ConfigService.DEVMODE() === true){
        $log.log('ContentBeschaffung im Devmode, kein auth');
        SAPHelperService.getInitialData().then(function(response){
            if(response === true){
                SAPHelperService.setAuthentication();
                $scope.scopes = SAPHelperService.getScopes();
                selectPreSelectedScope();
            }
        })
    }else{
        $log.log('ContentBeschaffung im standardverfahren');
        $scope.scopes = SAPHelperService.getScopes();
        selectPreSelectedScope();
    }

    $scope.newItem = {name: '', descr: '', longtext: '', scopes: []};

    function selectPreSelectedScope(){
        var id = SAPHelperService.getSelectedScope().id;
        angular.forEach($scope.scopes, function(value, key){
            if(value.id === id){
                value.checked = true;
            }
        })
    }


    $scope.leavePage = function(){
        $state.go('items');
    }

    $scope.onAddNewItem = function(){
        angular.forEach($scope.scopes, function(value,key){
            if(value.checked != undefined && value.checked == true){
                $scope.newItem.scopes.push(parseInt(value.id));
            }
        })
        $log.log($scope.newItem);
        SAPHelperService.addNewItem($scope.newItem).then(function(response){
            if(response === true){
                $log.log('++from newItemCtrl:new item added ');
                $state.go('items', {reload:true});
            }
        });
    }

})