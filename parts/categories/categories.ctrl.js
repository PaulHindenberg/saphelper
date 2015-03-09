/**
 * Created by paulhindenberg on 08.02.15.
 */
SAPHelper.controller('CategoriesCtrl', function($scope, $log, SAPHelperService, $state, ConfigService) {
    window.scope = $scope;

    if(SAPHelperService.getAuthentication() === false && ConfigService.DEVMODE() === true){
        $log.log('ContentBeschaffung im Devmode, kein auth');
        SAPHelperService.getInitialData().then(function(response){
            if(response === true){
                SAPHelperService.setAuthentication();
                $scope.categories = SAPHelperService.getCategories();
            }
        })
    }else{
        $log.log('ContentBeschaffung im standardverfahren');
        $scope.categories = SAPHelperService.getCategories();
    }

    $scope.onCategoryChosen = function(c){
        SAPHelperService.setSelectedCategory(c);
        $state.go('scopes');
    }


})