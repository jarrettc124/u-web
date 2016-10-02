angular.module('sessionApp',['ngCookies','InstagramCtrl']).factory('Endpoint', ['$q', '$timeout', '$http', function ($q, $timeout, $http) {

    // create user variable
    var presistentHeader = {};

    var baseUrl = "https://unum-test.herokuapp.com";

    // return available functions for use in the controllers
    return ({
      baseUrl: baseUrl,
      addPersistentHeader: addPersistentHeader
    });

    function addPersistentHeader(key,value){
      presistentHeader[key] = value;
    }
}]);

// angular.module('sessionApp').factory('Endpoint', ['$q', '$timeout', '$http', function ($q, $timeout, $http) {



// }]);

angular.module('sessionApp').service('SessionUser', function($http,Endpoint) {
  

  this.init = function(user){
    this.currentUser = user
  }

});

angular.module('sessionApp').factory('Multiuser', ['Base64','$q', '$timeout', '$http','Endpoint','SessionUser','$cookies','Account', function (Base64,$q, $timeout, $http, Endpoint,SessionUser,$cookies,Account) {

    // return available functions for use in the controllers

    function loginWithInstagram(instagramAccount) {

      var param = {
        "type":"web",
        "instagramId":instagramAccount.id,
        "instagramToken":instagramAccount.accessToken,
        "username":instagramAccount.username,
        "fullName":instagramAccount.fullName,
        "numFollowers":instagramAccount.numFollowers,
        "numFollowing":instagramAccount.numFollowing
      }

      // create a new instance of deferred
      var deferred = $q.defer();
      // send a post request to the server
      // $http.post(Endpoint.baseUrl+'/v1/login/instagram',param)

      $http.post(Endpoint.baseUrl+'/v1/login/instagram',param)
      .then(function(response){
            

        var deviceToken = null;
        if (response.data){
          if (response.data.sessions.length > 0){

            deviceToken = response.data.sessions[0]._id;

            var auth = Base64.encode(response.data._id+":"+deviceToken);

            $cookies.put('auth', auth);

          }
        }

        deferred.resolve(response);
      },function(error){
        deferred.reject(error);
      });

      // return promise object
      return deferred.promise;

    }

    function createNewUser(account){

      var param = {
        "type":"web",
        "instagramId":account.id,
        "instagramToken":account.accessToken,
        "username":account.username,
        "fullName":account.fullName,
        "numFollowers":account.numFollowers,
        "numFollowing":account.numFollowing
      }

      var deferred = $q.defer();

      $http.post(Endpoint.baseUrl+'/v1/users',param)
      .then(function(response){

        loginWithInstagram(account)
        .then(function(response){

          console.log("login success!");
          deferred.resolve(response);

        },function(error){
          console.log("error creating user");
          deferred.reject(error);
        });

      },function(error){
        deferred.reject(error);
      });

      return deferred.promise;

    }

    function refreshUser(){

      var deferred = $q.defer();

      var cookie = $cookies.get("auth");

      if (!cookie){
        return;
      }

      $http.get(Endpoint.baseUrl+'/v1/self',{headers: {
      'Authorization': 'Basic '+cookie
      }})
      .then(function(response){

        SessionUser.init(response.data);

        Account.getUserInfo(SessionUser.currentUser.instagramToken)
        .then(function(user){

          var param = {
            "instagramId": Account.id,
            "username": Account.username,
            "fullName": Account.fullName,
            "avatarUrl": Account.avatarUrl,
            "numFollowers": Account.numFollowers,
            "numFollowing": Account.numFollowing,
          }

          $http.put(Endpoint.baseUrl+'/v1/users/'+SessionUser.currentUser._id,param,{headers: {
          'Authorization': 'Basic '+cookie
          }})
          .then(function(response){
            console.log("DONE UPDATING");
          },function(error){

          });

          deferred.resolve(SessionUser);

        },function(error){
          
          deferred.reject(error);

        });

      },function(error){

        deferred.reject(error);

      });

        // var url = "https://api.instagram.com/v1/users/self?access_token="+SessionUser.instagramToken;
        // $http.jsonp(url+'&callback=JSON_CALLBACK').success(function(data) {
        //     // $scope.data = data;
        //     if (data){
        //       if (data.data){
        //         data.data["accessToken"] = accessToken;

        //         Account.init(data.data);



        //         deferred.resolve(response.data);


        //       }else{
        //         deferred.reject();
        //       }
        //     }else{
        //        deferred.reject();
        //     }

        // });


      // },function(error){

      //   deferred.reject(error);

      // });

      return deferred.promise;

    }


    return ({
      loginWithInstagram: loginWithInstagram,
      createNewUser: createNewUser,
      refreshUser: refreshUser
    });

}]);

// angular.module('sampleApp').factory('AuthService', ['Base64','$q', '$timeout', '$http', function (Base64,$q, $timeout, $http) {

//     // create user variable
//     var user = null;

//     // return available functions for use in the controllers
//     return ({
//       isLoggedIn: isLoggedIn,
//       getUserStatus: getUserStatus,
//       login: login,
//       logout: logout,
//       register: register
//     });

//     function isLoggedIn() {
//       if(user) {
//         return true;
//       } else {
//         return false;
//       }
//     }

//     function getUserStatus() {
//       return user;
//     }

//     function login(username, password) {

//       // create a new instance of deferred
//       var deferred = $q.defer();

//       // send a post request to the server
//       $http.post('/user/login',
//         {username: username, password: password})
//         // handle success
//         .success(function (data, status) {
//           if(status === 200 && data.status){
//             user = true;
//             deferred.resolve();
//           } else {
//             user = false;
//             deferred.reject();
//           }
//         })
//         // handle error
//         .error(function (data) {
//           user = false;
//           deferred.reject();
//         });

//       // return promise object
//       return deferred.promise;

//     }

//     function logout() {

//       // create a new instance of deferred
//       var deferred = $q.defer();

//       // send a get request to the server
//       $http.get('/user/logout')
//         // handle success
//         .success(function (data) {
//           user = false;
//           deferred.resolve();
//         })
//         // handle error
//         .error(function (data) {
//           user = false;
//           deferred.reject();
//         });

//       // return promise object
//       return deferred.promise;

//     }

//     function register(username, password) {

//       // create a new instance of deferred
//       var deferred = $q.defer();

//       // send a post request to the server
//       $http.post('https://unum-api.herokuapp.com',
//         {username: username, password: password})
//         // handle success
//         .success(function (data, status) {
//           if(status === 200 && data.status){
//             deferred.resolve();
//           } else {
//             deferred.reject();
//           }
//         })
//         // handle error
//         .error(function (data) {
//           deferred.reject();
//         });

//       // return promise object
//       return deferred.promise;

//     }

// }])

angular.module('sessionApp').factory('Base64', function () {
    /* jshint ignore:start */
  
    var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  
    return {
        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;
  
            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
  
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
  
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
  
                output = output +
                    keyStr.charAt(enc1) +
                    keyStr.charAt(enc2) +
                    keyStr.charAt(enc3) +
                    keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);
  
            return output;
        },
  
        decode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;
  
            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(input)) {
                window.alert("There were invalid base64 characters in the input text.\n" +
                    "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                    "Expect errors in decoding.");
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
  
            do {
                enc1 = keyStr.indexOf(input.charAt(i++));
                enc2 = keyStr.indexOf(input.charAt(i++));
                enc3 = keyStr.indexOf(input.charAt(i++));
                enc4 = keyStr.indexOf(input.charAt(i++));
  
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;
  
                output = output + String.fromCharCode(chr1);
  
                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }
  
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
  
            } while (i < input.length);
  
            return output;
        }
    };
  
    /* jshint ignore:end */
});
