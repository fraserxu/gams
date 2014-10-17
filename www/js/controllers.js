angular.module('gams.controllers', [])

.controller('LoginCtrl', function($scope, $state, User) {
  $scope.loginData = {name: '', password: ''};

  $scope.login = function() {

    // TODO: validate
    User.login($scope.loginData.name, $scope.loginData.password).then(function(data) {

      // Jump to devices page
      $state.go('devices')

    }, function(err) {
      // TODO: show error message.
    })

  }
})

.controller('DevicesCtrl', function($scope, devices) {
  $scope.devices = devices;
})

.controller('DeviceCtrl', function($scope, $stateParams, deviceAQI, aqiHistory, outdoorAqi, devices) {
  $scope.deviceAQI = deviceAQI;
  $scope.aqiHistory = aqiHistory;
  $scope.outdoorAqi = outdoorAqi;

  var deviceId = $stateParams.deviceId;

  var idx = devices.map(function(device) {
    return device.id
  }).indexOf(deviceId);

  $scope.device = devices[idx]
});