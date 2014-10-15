angular.module('gams.services', [])

.factory('User', ['$http', function($http) {
  function login(name, password) {
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

      // TODO: save token
    })
    .error(function(data, status, headers, config) {
      console.log('login error')
    })
  }
  return {
    login: login
  }
}])

.factory('Devices', function() {
  var fakeDevices = [
    {
      "id":"50f5f190-05bb-4dfe-8714-9dc5ceb8e0d4",
      "name":{
        "en":"Stefan_demo",
        "zh-CN":"Stefan_demo"
      },
      "location":{
        "en":"shanghai",
        "zh-CN":"上海"
      },
      "model":"pdr1500"
    },
    {
      "id":"69eee2ce-e955-4941-94b6-a123806915ba",
      "name":{
        "en":"Notes2_demo",
        "zh-CN":"Notes2_demo"
      },
      "location":{
        "en":"shanghai",
        "zh-CN":"上海"
      },
      "model":"pdr1500"
    },
    {
      "id":"3e8e5630-e24e-11e3-b2f5-001bc509a05f",
      "name":{
        "en":"jll",
        "zh-CN":"jll"
      },
      "location":{
        "en":"shanghai",
        "zh-CN":"上海"
      },
      "model":"pdr1500"
    }
  ];

  return {
    all: function() {
      return fakeDevices;
    },
    get: function(deviceId) {
      return fakeDevices.filter(function(device) {
        return device.id === deviceId
      })[0]
    }
  }
});