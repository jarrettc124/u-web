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

		.when('/geeks', {
			templateUrl: 'views/geek.html',
			controller: 'GeekController'	
		});

	$locationProvider.html5Mode(true);

}]);