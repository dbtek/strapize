function ThemeCtrl($scope, $routeParams){
  $scope.theme = $routeParams.themeName;
  $scope.bootswatchThemes = bootswatchThemes;

  $scope.modifyLessVar = function(key, val){
    less.modifyVars({ key: val });
  }
}
