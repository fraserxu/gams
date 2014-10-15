angular.module('gams', [
  'ionic',
  'gams.controllers',
  'gams.services'
])

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

  // enable CORS
  $httpProvider.defaults.withCredentials = true;

  $stateProvider
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })
  .state('devices', {
    url: '/devices',
    templateUrl: 'templates/devices.html',
    controller: 'DevicesCtrl'
  })
  .state('device', {
    url: '/device/:deviceId',
    templateUrl: 'templates/device.html',
    controller: 'DeviceCtrl'
  })

  $urlRouterProvider.otherwise('/');
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})