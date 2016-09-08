/**
 * Created by kinlin on 9/7/16.
 */


app.controller('HomeCtrl', function($scope, $state){
    $scope.gotoDashboard = function(){
        $state.go('dashboard');
    }
})