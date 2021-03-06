/**
 * Created by kinlin on 8/27/16.
 */

app.controller('DashboardCtrl', function($scope, $mdBottomSheet, $mdSidenav, $mdDialog, $state, ItemService, LoginService, ProfileService, SERVER_URL){

    $scope.server_url=SERVER_URL
    $scope.profile = ProfileService;

    $scope.gotoLogin = function(){
        $state.go('login');
    }

    $scope.gotoProfile = function(){
        $state.go('profile');
    }

    $scope.logout = function(){
        LoginService.logout();
        ProfileService.setUserInfo('');
        ProfileService.setUserCred('');
    }

    $scope.toggleSidenav = function(menuId) {
        $mdSidenav(menuId).toggle();
    };
    $scope.menu = [
        {
            link : '',
            title: 'Dashboard',
            icon: 'dashboard'
        },
        {
            link : '',
            title: 'Friends',
            icon: 'group'
        },
        {
            link : '',
            title: 'Messages',
            icon: 'message'
        }
    ];
    $scope.admin = [
        {
            link : '',
            title: 'Trash',
            icon: 'delete'
        },
        {
            link : 'showListBottomSheet($event)',
            title: 'Settings',
            icon: 'settings'
        }
    ];
    ItemService.getAll().then(function(data){
        $scope.items = data;
    });
    $scope.alert = '';
    $scope.showListBottomSheet = function($event) {
        $scope.alert = '';
        $mdBottomSheet.show({
            templateUrl: 'templates/buttonList.html',
            controller: 'ListBottomSheetCtrl',
            targetEvent: $event
        }).then(function(clickedItem) {
            $scope.alert = clickedItem.name + ' clicked!';
        });
    };

    $scope.showAdd = function(ev) {
        $mdDialog.show({
            controller: 'DashboardCtrl',
            templateUrl: 'templates/addService.html',
            targetEvent: ev,
        })
            .then(function(answer) {
                $scope.alert = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.alert = 'You cancelled the dialog.';
            });
    };

    $scope.cancelAdd = function() {
        $mdDialog.cancel();
    };
    $scope.saveNew = function() {
        ItemService.addNew($scope.item).then(function(item){
            $scope.$apply(function(){
                $scope.items.push(item);
            })
        });
        $mdDialog.hide();
    };

});