angular.module('gams.controllers', [])

.controller('LoginCtrl', function($scope, $state, User) {
  $scope.loginData = {name: '', password: ''};

  $scope.login = function() {

    // TODO: validate
    User.login($scope.loginData.name, $scope.loginData.password)

  }
})

.controller('DevicesCtrl', function($scope, devices) {
  $scope.devices = devices;
})

.controller('DeviceCtrl', function($scope, deviceAQI, aqiHistory, outdoorAqi) {
  $scope.deviceAQI = deviceAQI;
  $scope.aqiHistory = aqiHistory;
  $scope.outdoorAqi = outdoorAqi;
});