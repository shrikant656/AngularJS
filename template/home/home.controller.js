(function () {
    'use strict';

    angular
        .module('routerApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['UserService', '$rootScope','$scope'];
    function HomeController(UserService, $rootScope, $scope) {
        var vm = this;

        vm.user = null;
        vm.allUsers = [];
        vm.deleteUser = deleteUser;

        initController();

        function initController() {
            loadCurrentUser();
            loadAllUsers();
        }

        function loadCurrentUser() {
            UserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                    vm.user = user;
                });
        }

        function loadAllUsers() {
            UserService.GetAll()
                .then(function (users) {
                    vm.allUsers = users;
                });
        }

        function deleteUser(id) {
            UserService.Delete(id)
            .then(function () {
                loadAllUsers();
            });
        }
        $scope.hi = 'tstss';
            
    }

    angular
        .module('routerApp').directive('validDate', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, control) {
            control.$parsers.push(function (viewValue) {
                var newDate = model.$viewValue;
                control.$setValidity("invalidDate", true);  
                if (typeof newDate === "object" || newDate == "") return newDate;  // pass through if we clicked date from popup
                if (!newDate.match(/^\d{1,2}\/\d{1,2}\/((\d{2})|(\d{4}))$/))
                    control.$setValidity("invalidDate", false);
                return viewValue;
            });
        }
    };
})

})();