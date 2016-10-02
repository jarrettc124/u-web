
var instagramApp = angular.module('InstagramCtrl', ['sessionApp','ngCookies']);

instagramApp.service('Account', function($q,$http) {
  	
	var self = this;

  	function init(obj){
		self.id = obj["id"];
		self.username = obj["username"];
		self.accessToken = obj["accessToken"];
		self.avatarUrl = obj["profile_picture"];
		self.fullName = obj["full_name"];
		var meta = obj["counts"];
		self.numFollowers = meta["followed_by"];
		self.numFollowing = meta["follows"];
	} 

	function getUserInfo(accessToken){

      	var deferred = $q.defer();

		if (!accessToken){
			return;
		}

		var url = "https://api.instagram.com/v1/users/self?access_token="+accessToken;
		$http.jsonp(url+'&callback=JSON_CALLBACK')
		.then(function(response){

		    if (response.data){
		    	if (response.data.data){
		    		response.data.data["accessToken"] = accessToken;
		    		self.init(response.data.data);
       			 	deferred.resolve(response.data.data);
		    	}else{
		    		deferred.reject(error);
		    	}
		    }else{
				deferred.reject();
		    }

		},function(error){
			deferred.reject(error);
		});

      return deferred.promise;

	}

	this.getUserInfo = getUserInfo;
	this.init = init;

});

instagramApp.controller('InstagramController', ['$scope','$http','$location','Account','Multiuser', 'SessionUser','$cookies',function($scope, $http, $location, Account,Multiuser,SessionUser,$cookies) {
	$scope.login = function() {

		var wLeft = window.screenLeft ? window.screenLeft : window.screenX;
   		var wTop = window.screenTop ? window.screenTop : window.screenY;

		var client_id = 'abdbf3d78cd44879a4e029aac620d890';
		var redirect_uri = 'http://localhost:5000/v1/login/instagram/callback/';
		var authURL = 'https://api.instagram.com/oauth/authorize/?client_id=' + client_id + '&redirect_uri=' + redirect_uri + '&response_type=token';
		var scope_basic = "basic";
		var popup = window.open(authURL + "&scope=" + scope_basic,'instapopup','left='+(wLeft + (window.innerWidth/2) - 225)+',top='+(wTop + (window.innerHeight/2)- 225)+','+'toolbar=no,location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, height=450,width=450');
		popup.win = window;
	}

	$scope.callbackLogin = function(){

		var accessToken = $location.hash().split('=')[1];
		var parentWindow = window.win;
		parentWindow.focus();
		parentWindow.angular.element(parentWindow.document.getElementById('ig-controller')).scope().getUserInfo(accessToken);
		window.close();
	}

	$scope.getUserInfo = function(accessToken){


		// Account.getUserInfo(accessToken)
		// .then(function(user){

		// },function(error){


		// });


		if (!accessToken){
			return;
		}

		var url = "https://api.instagram.com/v1/users/self?access_token="+accessToken;
		$http.jsonp(url+'&callback=JSON_CALLBACK').success(function(data) {
		    // $scope.data = data;
		    if (data){
		    	if (data.data){
		    		data.data["accessToken"] = accessToken;
		    		Account.init(data.data);
		    		Multiuser.loginWithInstagram(Account)
		    		.then(function(data){
		    			console.log("done logged in success!!");
						// console.log(SessionUser.currentUser);
		    			window.location = "firstpage";
		    		},function(error){
		    			console.log(error.status);
		    			if (error.status == 404){
		    				console.log("create new user");
		    				Multiuser.createNewUser(Account)
		    				.then(function(data){
		    					console.log("success");
		    					window.location = "firstpage";

		    				},function(error){
		    					console.log("can't create user")
		    				});
		    			}
		    		});
		    	}
		    }

		});

	}
}]);

