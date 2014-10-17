angular.module('gams', [
  'ionic',
  'gams.controllers',
  'gams.services'
])

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

  // enable CORS
  // $httpProvider.defaults.withCredentials = true;

  $stateProvider
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl',
    resolve: {
      // token: function(User) {
      //   return User.token()
      // }
    }
  })
  .state('devices', {
    url: '/devices',
    templateUrl: 'templates/devices.html',
    controller: 'DevicesCtrl',
    resolve: {
      devices: function(Devices) {
        return Devices.all()
      }
    }
  })
  .state('device', {
    url: '/device/:deviceId',
    templateUrl: 'templates/device.html',
    controller: 'DeviceCtrl',
    resolve: {
      devices: function(Devices) {
        return Devices.all()
      },
      deviceAQI: function(Devices, $stateParams) {
        return Devices.deviceAQIs($stateParams.deviceId)
      },
      aqiHistory: function(Devices, $stateParams) {
        return Devices.AQIHistory($stateParams.deviceId, '24h', '20m')
      },
      outdoorAqi: function(Devices, $stateParams) {
        return Devices.OutdoorAQI($stateParams.deviceId)
      }
    }
  })

  $urlRouterProvider.otherwise('/');
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {

    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
