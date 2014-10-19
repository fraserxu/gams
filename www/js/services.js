angular.module('gams.services', [])

.factory('Request', ['$http', '$q', '$state', '$localstorage', '$timeout', function($http, $q, $state, $localstorage, $timeout) {
  /**
   * get requst wrapper
   * @param  {params} params code
   * @return {[type]}        [description]
   */
  function get(url) {
    if(!$localstorage.getObject('token')) {
      $timeout(function() {
        return $state.go('login')
      })
    } else {
      var token = $localstorage.getObject('token');
    }

    var defer = $q.defer();

    $http.get(url, {
      headers: {
        'Authorization': 'Bearer ' + token['access_token'],
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .success(function(data, status, headers, config) {
      console.log(url, data)
      defer.resolve(data)
    })
    .error(function(data, status, headers, config) {
      console.log(url, 'get devices error')
      defer.reject(data)
    })

    return defer.promise;
  }

  /**
   * Post reqeust wrapper
   * @param  {string} request url
   * @param  {Object/Array} data object or array
   * @return {promise} data
   */
  function post(url, data) {
    if(!$localstorage.getObject('token')) {
      $timeout(function() {
        return $state.go('login')
      })
    } else {
      var token = $localstorage.getObject('token');
    }

    var defer = $q.defer()

    $http.post(url,
      data
    , {
      headers: {
        'Authorization': 'Bearer ' + token['access_token'],
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .success(function(data, status, headers, config) {
      console.log(url, data)

      defer.resolve(data)
    })
    .error(function(data, status, headers, config) {
      console.log(url, 'get AQIs error')
      defer.reject(data)
    })

    return defer.promise;
  }

  return {
    get: get,
    post: post
  }
}])

.factory('User', ['$http', '$q', 'Request', function($http, $q, Request) {

  /**
   * get accessToken
   * @return {promise} auth data with accessToken
   */
  function token() {
    var defer = $q.defer()

    $http({
      method: 'POST',
      url: 'http://api.gam-systems.com.cn/token',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      transformRequest: function(obj) {
        var str = [];
        for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
      },
      data: {
        'grant_type': 'client_credentials',
        'client_id': '6SU4TdVhrXu8v7SG',
        'client_secret': 'S2i855MOlJhnyK0N'
      }
    })
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
    var url = 'http://api.gam-systems.com.cn/v1/account_auth';
    return Request.post(url, {
      name: name,
      password: password
    })
  }

  return {
    token: token,
    login: login
  }
}])

.factory('Devices', ['Request', '$localstorage', '$state', '$timeout', function(Request, $localstorage, $state, $timeout) {

  /**
   * get all devices
   * @return {promise} all the device, will be resolved in ui-roter config
   */
  function all() {
    if(!$localstorage.get('code')) {
      $timeout(function() {
        return $state.go('login')
      })
    } else {
      var code = $localstorage.get('code');
    }

    console.log('code', code)
    var url = 'http://api.gam-systems.com.cn/v1/devices?code=' + code;

    return Request.get(url)
  };

  /**
   * get device AQIs from device ID array
   * @param  {Array} deviceId Array
   * @return {promise}          AQI Data
   */
  function deviceAQIs(deviceId) {
    var url = 'http://api.gam-systems.com.cn/v1/aqis/latest';
    return Request.post(url, [deviceId])
  };

  /**
   * Get AQIHistory from deviceId and d, g
   * @param {string} deviceId
   * @param {string} d        day is either ‘720h’ (month) or ‘24h’ (day)
   * @param {string} g        timegap is either ‘12h’ (month) or ‘20m’ (day)
   */
  function AQIHistory(deviceId, d, g) {
    var url = 'http://api.gam-systems.com.cn/v1/aqis/history?d=' + d + '&g=' + g;
    return Request.post(url, [deviceId])
  };

  /**
   * get outdoor by cityName
   * @param {string} cityName
   */
  function OutdoorAQI(cityName) {
    var url = 'http://api.gam-systems.com.cn/v1/aqis/latest';
    return Request.post(url, [cityName])
  }

  return {
    all: all,
    deviceAQIs: deviceAQIs,
    AQIHistory: AQIHistory,
    OutdoorAQI: OutdoorAQI
  }
}])

// localStorage wrapper
// http://learn.ionicframework.com/formulas/localstorage/
.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}]);