/**
 * Created by kinlin on 9/8/16.
 */

app.controller('ProfileCtrl', function($scope, $http, $state, ProfileService, SERVER_URL){
    $scope.user = ProfileService.userInfo;

    $scope.$watch('files.length',function(newVal,oldVal){
        $scope.uploadFile();
    });

    $scope.uploadFile = function(){
        var formData = new FormData();
        angular.forEach($scope.files,function(obj){
            formData.append('uploadedFile', obj.lfFile);
        });
        $http.post(SERVER_URL+'/files/', formData, {
            headers: {'Content-Type': undefined}
        }).then(function(result){
            $scope.user.avatar_id=result.data.id
        },function(err){
            // do sometingh
        });
    }

    $scope.submit = function(){
        ProfileService.update($scope.user);
        $state.go('dashboard');
    }
})