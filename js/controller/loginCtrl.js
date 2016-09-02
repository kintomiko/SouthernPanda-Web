/**
 * Created by kinlin on 8/27/16.
 */

app.controller('LoginCtrl', function($scope, $state, $mdDialog, LoginService, ProfileService){

    $scope.data = {};

    $scope.login = function(){
        return LoginService.login($scope.data.email, $scope.data.password)
            .then(function(authData){
                if(authData.success){
                    ProfileService.setUserInfo(authData.user);
                    ProfileService.setUserCred(authData.cred);
                    $state.go('home');
                }else{
                    showErrorCredAlert(authData.message);
                }
            });
    }

    var showErrorCredAlert = function (msg) {
        var errorCredAlert = $mdDialog.alert({
            title: 'Incorrect Credential',
            textContent: msg,
            ok: 'Close'
        });
        $mdDialog
            .show( errorCredAlert )
            .finally(function() {
                errorCredAlert = undefined;
            });
    }

})