/**
 * Created by paulhindenberg on 08.02.15.
 */
/**
 * Created by paulhindenberg on 08.02.15.
 */
SAPHelper.controller('ItemsCtrl', function($rootScope, $scope, $log, SAPHelperService, $state, ConfigService) {
    if(SAPHelperService.getAuthentication() === false && ConfigService.DEVMODE() === true){
        $log.log('ContentBeschaffung im Devmode, kein auth');
        SAPHelperService.getInitialData().then(function(response){
            if(response === true){
                SAPHelperService.setAuthentication();
                $scope.items = SAPHelperService.getItems();
            }
        })
    }else{
        $log.log('######ContentBeschaffung im standardverfahren');
        $scope.items = SAPHelperService.getItems();
    }

    window.scopeItems = $scope;

    $scope.leavePage = function(){
        $state.go('scopes');
    }

    $scope.onItemSelected = function(i){
        //SAPHelperService.setSelectedCategory(i);
        $state.go('itemDetail',{itemId:i.id});
    }


    $scope.onNewItemClicked = function(){
       $state.go('newItem');
    }

    $rootScope.$on('$stateChangeSuccess',
        function(event, toState, toParams, fromState, fromParams){
            if(toState.name == 'items' && (fromState.name == 'newItem' || fromState.name == 'itemDetail')){
                $log.log('stateChangeSuccessLog');
                $scope.items = SAPHelperService.getItems();
            }
        })

})