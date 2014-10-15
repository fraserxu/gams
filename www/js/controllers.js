angular.module('gams.controllers', [])

.controller('LoginCtrl', function($scope, $state, User) {
  $scope.loginData = {name: '', password: ''};

  $scope.login = function() {

    // TODO: validate
    User.login($scope.loginData.name, $scope.loginData.password)

  }
})

.controller('DevicesCtrl', function($scope) {
  $scope.devices = fakeDevices;
})

.controller('DeviceCtrl', function($scope, $stateParams) {
  $scope.device = fakeDevices[$stateParams.deviceId - 1]
});