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
			controller: 'FirstPageController'
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

		.when('/instagram', {
			templateUrl: 'views/instagram.html',
			controller: 'InstagramController'
		})

		.when('/geeks', {
			templateUrl: 'views/geek.html',
			controller: 'GeekController'	
		});

	$locationProvider.html5Mode(true);

	// $stateProvider.
 //    state('oauthsuccess', {
 //        url: "/access_token={access_token}",
 //        templateUrl: '/Partials/OAuth.html',
 //        controller: 'OAuthLoginController'
 //    });

}]);