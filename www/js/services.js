angular.module('gams.services', [])

.factory('User', ['$http', '$q', function($http, $q) {

  /**
   * login
   * @param  {string} name     username
   * @param  {string} password filed
   * @return {promise}          res data
   */
  function login(name, password) {
    var defer = $q.defer()

    $http.post('http://api.gam-systems.com.cn/v1/account_auth', {
      name: name,
      password: password
    }, {
      headers: {
        'Authorization': 'Bearer MDZmMGI2MDItNDc3NC00ZmJmLWJmZDYtY2E4YzgyMGE1ODJm',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .success(function(data, status, headers, config) {
      console.log('login success')

      defer.resolve(data);
      // TODO: save token
    })
    .error(function(data, status, headers, config) {
      console.log('login error')
      defer.reject(data)
    })

    return defer.promise;
  }


  return {
    login: login
  }
}])

.factory('Devices', ['$http', '$q', function($http, $q) {

  /**
   * get all devices
   * @return {promise} all the device, will be resolved in ui-roter config
   */
  function all() {
    var defer = $q.defer()

    // get code somewhere
    var code = 'fqMvD41AfluPv30b';

    $http.get('http://api.gam-systems.com.cn/v1/devices?code=' + code, {
      headers: {
        'Authorization': 'Bearer MDZmMGI2MDItNDc3NC00ZmJmLWJmZDYtY2E4YzgyMGE1ODJm',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .success(function(data, status, headers, config) {
      console.log('devices', data)

      defer.resolve(data)
    })
    .error(function(data, status, headers, config) {
      console.log('get devices error')
      defer.reject(data)
    })

    return defer.promise;
  };

  /**
   * get device AQIs from device ID array
   * @param  {Array} deviceId Array
   * @return {promise}          AQI Data
   */
  function deviceAQIs(deviceId) {
    var defer = $q.defer()

    // get code somewhere
    var code = 'fqMvD41AfluPv30b';

    $http.post('http://api.gam-systems.com.cn/v1/aqis/latest', {
      IDs: [deviceId]
    }, {
      headers: {
        'Authorization': 'Bearer MDZmMGI2MDItNDc3NC00ZmJmLWJmZDYtY2E4YzgyMGE1ODJm',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .success(function(data, status, headers, config) {
      console.log('AQIs', data)

      defer.resolve(data)
    })
    .error(function(data, status, headers, config) {
      console.log('get AQIs error')
      defer.reject(data)
    })

    return defer.promise;
  };

  function AQIHistory(deviceId) {
    var defer = $q.defer()

    // get code somewhere
    var code = 'fqMvD41AfluPv30b';

    $http.post('http://api.gam-systems.com.cn/v1/aqis/history', {
      IDs: [deviceId]
    }, {
      headers: {
        'Authorization': 'Bearer MDZmMGI2MDItNDc3NC00ZmJmLWJmZDYtY2E4YzgyMGE1ODJm',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .success(function(data, status, headers, config) {
      console.log('devices', data)

      defer.resolve(data)
    })
    .error(function(data, status, headers, config) {
      console.log('get devices error')
      defer.reject(data)
    })

    return defer.promise;
  };

  function OutdoorAQI(deviceId) {
    var defer = $q.defer()

    // get code somewhere
    var code = 'fqMvD41AfluPv30b';

    $http.post('http://api.gam-systems.com.cn/v1/aqis/latest', {
      IDs: [deviceId]
    }, {
      headers: {
        'Authorization': 'Bearer MDZmMGI2MDItNDc3NC00ZmJmLWJmZDYtY2E4YzgyMGE1ODJm',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .success(function(data, status, headers, config) {
      console.log('devices', data)

      defer.resolve(data)
    })
    .error(function(data, status, headers, config) {
      console.log('get devices error')
      defer.reject(data)
    })

    return defer.promise;
  }

  return {
    all: all,
    deviceAQIs: deviceAQIs,
    AQIHistory: AQIHistory,
    OutdoorAQI: OutdoorAQI
  }
}]);