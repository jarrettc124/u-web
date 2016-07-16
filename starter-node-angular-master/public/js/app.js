var App = angular.module('sampleApp', ['ngRoute', 'appRoutes', 'LogoCtrl','LoginCtrl', 'SignupCtrl', 'MainCtrl', 'NerdCtrl', 'GeekCtrl', 'FirstPageCtrl']);

App.controller('exampleCtrl', exampleCtrl);
exampleCtrl.$inject = [];
function exampleCtrl(){
  var vm = this;
  vm.testData = ['one', 'two', 'three'];
  vm.selectedItem = vm.testData[0];
  vm.changeEvent = function (item){
    vm.selectedItem = item;
  }
}

App.directive('uiDropdown', uiDropdown);
uiDropdown.$inject=[];
function uiDropdown (){
  return {
    restrict: 'A',
    link: function(scope, element, attr, ctrl) {
      var ulDropdown = element.next("[ui-dropdown-data]");
      element.on('click', function() { // Click on ui-dropdown
        ulDropdown[0].style.display = ulDropdown[0].style.display === 'none' ? 'block' : 'none';
      });
      ulDropdown.on('click', function (data) { //click on ui-dropdown-data
        ulDropdown[0].style.display = 'none';
      });
      element.parent().on('mouseleave', function () { // leave parent div
        ulDropdown[0].style.display = 'none';
      });
    }
  };
}
