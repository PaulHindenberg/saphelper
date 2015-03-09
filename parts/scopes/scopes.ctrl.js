/**
 * Created by paulhindenberg on 08.02.15.
 */
SAPHelper.controller('ScopesCtrl', function($scope, SAPHelperService, ConfigService, $log, $state) {
    if(SAPHelperService.getAuthentication() === false && ConfigService.DEVMODE() === true){
        $log.log('ContentBeschaffung im Devmode, kein auth');
        SAPHelperService.getInitialData().then(function(response){
            if(response === true){
                SAPHelperService.setAuthentication();
                $scope.scopes = SAPHelperService.getScopes();
            }
        })
    }else{
        $log.log('ContentBeschaffung im standardverfahren');
        $scope.categories = SAPHelperService.getCategories();
    }

    $scope.leavePage = function(){
        $state.go('categories');
    }

    $scope.scopes = SAPHelperService.getScopes();

    $scope.onScopeSelected = function(s){
        SAPHelperService.setSelectedScope(s);
        $state.go('items');
    }
})