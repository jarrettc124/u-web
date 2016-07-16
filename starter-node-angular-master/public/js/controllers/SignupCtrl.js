angular.module('SignupCtrl', []).controller('SignupController', function($scope, $sce, $location) {
	$scope.myImgSrc = $sce.trustAsResourceUrl('img/loginbackground.png');
	$scope.backarrow = $sce.trustAsResourceUrl('img/back.png');
	$scope.register = function() {
		window.location = "firstpage";
	// $scope.error = false;
 //      $scope.disabled = true;

 //      // call register from service
 //      AuthService.register($scope.registerForm.username, $scope.registerForm.password)
 //        // handle success
 //        .then(function () {
 //          $location.path('/login');
 //          $scope.disabled = false;
 //          $scope.registerForm = {};
 //        })
 //        // handle error
 //        .catch(function () {
 //          $scope.error = true;
 //          $scope.errorMessage = "Something went wrong!";
 //          $scope.disabled = false;
 //          $scope.registerForm = {};
 //        });

	}
});

