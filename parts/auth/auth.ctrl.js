/**
 * Created by paulhindenberg on 08.02.15.
 */
/**
 * Created by paulhindenberg on 08.02.15.
 */
SAPHelper.controller('AuthCtrl', function($scope, $state, SAPHelperService, $ionicLoading) {

    $scope.pin = [];
    var validPin = [1,1,1,1];
   // $scope.pin = {test:''};

    $scope.numberClicked = function(i){
        $scope.pin.push(i);
        if($scope.pin.length === 4){
            $ionicLoading.show({
                template: 'Checkin && Downloading Content...'
            });
            if($scope.pin[0] === validPin[0] &&
                $scope.pin[1] === validPin[1] &&
                $scope.pin[2] === validPin[2] &&
                $scope.pin[3] === validPin[3]){
                SAPHelperService.setAuthentication();
                SAPHelperService.getInitialData().then(function(response){
                    if(response == true){
                        $ionicLoading.hide();
                        $state.go('categories');
                    }
                })
            }
        }
    }

    $scope.removeLastNumber = function(){
        $scope.pin.pop();
    }
})