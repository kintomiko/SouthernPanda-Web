/**
 * Created by kinlin on 8/27/16.
 */

app.controller("AddDialogCtrl", function($scope, $mdDialog, ItemService) {
    $scope.hide = function() {
        $mdDialog.hide();
    };
    $scope.cancel = function() {
        $mdDialog.cancel();
    };
    $scope.save = function() {
        ItemService.addNew($scope.item);
        $mdDialog.hide();
    };
});