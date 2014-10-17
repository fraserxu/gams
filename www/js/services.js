angular.module('gams.services', [])

.factory('User', ['$http', '$q', function($http, $q) {

  /**
   * get accessToken
   * @return {promise} auth data with accessToken
   */
  function token() {
    var defer = $q.defer()

    $http.post('http://api.gam-systems.com.cn/token', {
      'grant_type': 'client_credentials',
      'client_id': '6SU4TdVhrXu8v7SG',
      'client_secret': 'S2i855MOlJhnyK0N'
    }, {})
    .success(function(data, status, headers, config) {
      defer.resolve(data)
    })
    .error(function(data, status, headers, config) {
      defer.reject(data)
    })

    return defer.promise;
  }

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
    token: token,
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

    $http.post('http://api.gam-systems.com.cn/v1/aqis/latest',
      [deviceId]
    , {
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

  /**
   * Get AQIHistory from deviceId and d, g
   * @param {string} deviceId
   * @param {string} d        day is either ‘720h’ (month) or ‘24h’ (day)
   * @param {string} g        timegap is either ‘12h’ (month) or ‘20m’ (day)
   */
  function AQIHistory(deviceId, d, g) {
    var defer = $q.defer()

    // get code somewhere
    var code = 'fqMvD41AfluPv30b';

    $http.post('http://api.gam-systems.com.cn/v1/aqis/history?d=' + d + '&g=' + g,
      [deviceId]
    , {
      headers: {
        'Authorization': 'Bearer MDZmMGI2MDItNDc3NC00ZmJmLWJmZDYtY2E4YzgyMGE1ODJm',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .success(function(data, status, headers, config) {
      console.log('aqi history', data)

      defer.resolve(data)
    })
    .error(function(data, status, headers, config) {
      console.log('get devices error')
      defer.reject(data)
    })

    return defer.promise;
  };

  /**
   * get outdoor by cityName
   * @param {string} cityName
   */
  function OutdoorAQI(cityName) {
    var defer = $q.defer()

    // get code somewhere
    var code = 'fqMvD41AfluPv30b';

    $http.post('http://api.gam-systems.com.cn/v1/aqis/latest',
      [cityName]
    , {
      headers: {
        'Authorization': 'Bearer MDZmMGI2MDItNDc3NC00ZmJmLWJmZDYtY2E4YzgyMGE1ODJm',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .success(function(data, status, headers, config) {
      console.log('outdoor aqis', data)

      defer.resolve(data)
    })
    .error(function(data, status, headers, config) {
      console.log('get outdoor aqis error')
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