controllersManager.controller('treinamentoDetailController', function ($scope, $rootScope, $http, $state, $ionicPopup, $ionicLoading) {

    $scope.trainings = [];

    $scope.retrieve = function () {

        // Salva o treinameto no LocalStorage
        var trainingJson = localStorage.getItem("training");
        
        $scope.training = JSON.parse(trainingJson);

        console.log($scope.training);
    }()

})