function ThemeCtrl($scope, $routeParams){
    $scope.theme = $routeParams.themeName;

    $scope.modifyLessVar = function(key, val){
        less.modifyVars({ key: val });
    }
}