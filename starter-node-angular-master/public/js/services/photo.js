angular.module('FirstPageCtrl').factory('Photo', ['$q','$http','Endpoint','SessionUser','$cookies',function ($q,$http,Endpoint,SessionUser,$cookies) {

  /*
  returns: [Photos]
  */
  function list(){

    var deferred = $q.defer();
    console.log(SessionUser);

      var cookie = $cookies.get("auth");

      if (!cookie){
        return;
      }

    $http.get(Endpoint.baseUrl+'/v1/posts?creator='+SessionUser.currentUser._id,{headers: {
    'Authorization': 'Basic '+cookie
    }})
    .then(function(response){
      console.log(response.data);
      deferred.resolve(response.data);

    },function(error){
      console.log(error);
      deferred.reject(error);
    });

    return deferred.promise;

  }

  /*
  returns: null
  */
  function deletePhotos(arr){
    var deferred = $q.defer();
      var cookie = $cookies.get("auth");

      if (!cookie){
        return;
      }

      var deleteArray = {"deleteArray":arr};

      $http({
          method: 'DELETE',
          url: Endpoint.baseUrl+'/v2/posts/',
          data: deleteArray,
          headers: {'Content-Type': 'application/json','Authorization': 'Basic '+cookie}
      })
      .then(function(response){
        console.log(response.data);
        deferred.resolve(response.data);

      },function(error){
        console.log(error);
        deferred.reject(error);

      });

      return deferred.promise;

  }

  /*
  returns: null
  */
  function updatePhotos(arr){


    var deferred = $q.defer();
    var cookie = $cookies.get("auth");

    if (!cookie){
      return;
    }

    var data = {"arr":arr};
    $http.post(Endpoint.baseUrl+'/v1/posts/updates/',data,{headers: {
    'Authorization': 'Basic '+cookie
    }})
    .then(function(response){
      deferred.resolve(response.data);

    },function(error){
      deferred.reject(error);

    });

    return deferred.promise;

  }



  return ({
    list: list,
    deletePhotos: deletePhotos,
    updatePhotos: updatePhotos
  });


}]);