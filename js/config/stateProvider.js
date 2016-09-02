/**
 * Created by kinlin on 8/27/16.
 */

app.config(function($stateProvider, $urlRouterProvider, $mdThemingProvider, $httpProvider) {

    var customBlueMap = $mdThemingProvider.extendPalette('light-blue', {
        'contrastDefaultColor': 'light',
        'contrastDarkColors': ['50'],
        '50': 'ffffff'
    });
    $mdThemingProvider.definePalette('customBlue', customBlueMap);
    $mdThemingProvider.theme('default')
        .primaryPalette('customBlue', {
            'default': '500',
            'hue-1': '50'
        })
        .accentPalette('pink');
    $mdThemingProvider.theme('input', 'default')
        .primaryPalette('grey')

    $stateProvider

        .state('login', {
            url: '/login',
            templateUrl: 'templates/login.html',
            controller: 'LoginCtrl'
        })

        // Setup an abstract state for the tabs directive
        .state('home', {
            url: '/home',
            templateUrl: 'templates/home.html',
            controller: 'HomeCtrl'
        })
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/home');

    //Enable cross domain calls
    $httpProvider.defaults.useXDomain = true;
});