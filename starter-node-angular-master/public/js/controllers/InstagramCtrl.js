angular.module('InstagramCtrl', []).controller('InstagramController', function($scope, $http) {
	$scope.login = function() {
		var client_id = 'abdbf3d78cd44879a4e029aac620d890';
		var redirect_uri = 'https://unum-api.herokuapp.com/v1/login/instagram/callback';
		var authURL = 'https://api.instagram.com/oauth/authorize/?client_id=' + client_id + '&redirect_uri=' + redirect_uri + '&response_type=code';
		var scope_basic = "basic";
		window.open(authURL + "&scope=" + scope_basic, "_self");
	}
});
