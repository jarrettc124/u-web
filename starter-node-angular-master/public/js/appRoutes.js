angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/logo.html',
			controller: 'LogoController'
		})

		.when('/login', {
			templateUrl: 'views/login.html',
			controller: 'LoginController'
		})

		.when('/signup', {
			templateUrl: 'views/signup.html',
			controller: 'SignupController',
			controllerAs: 'vm'
		})

		.when('/firstpage', {
			templateUrl: 'views/firstpage.html',
			controller: 'FirstPageController',
			resolve: {
	            init: function() {

	              return function($q,$cookies,Multiuser){

	              	var deferred = $q.defer();

	              	Multiuser.refreshUser()
	              	.then(function(user){

       					deferred.resolve(user);
	              	},function(error){
	              		deferred.resolve(reject);
	              	});
       				
      				return deferred.promise;

	              }

	            }
			}
		})

		.when('/home', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})		

		.when('/nerds', {
			templateUrl: 'views/nerd.html',
			controller: 'NerdController'
		})

		.when('/instagram', {
			templateUrl: 'views/instagram.html',
			controller: 'InstagramController'
		})

		// .when('/instagram', {
		// 	templateUrl: 'views/instagram.html',
		// 	controller: 'InstagramController'
		// })

		.when('/geeks', {
			templateUrl: 'views/geek.html',
			controller: 'GeekController'	
		})
		.when('/v1/login/instagram/callback/',{

			templateUrl: 'views/instagram.html',
			controller: 'InstagramController'	

		});

	$locationProvider.html5Mode(true);

	// $stateProvider.
 //    state('oauthsuccess', {
 //        url: "/access_token={access_token}",
 //        templateUrl: '/Partials/OAuth.html',
 //        controller: 'OAuthLoginController'
 //    });

}]);