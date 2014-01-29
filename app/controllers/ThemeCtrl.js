function ThemeCtrl($scope, $routeParams){
  $scope.themeName = $routeParams.themeName;

  angular.forEach(bootswatchThemes, function(val){
    if($scope.themeName.toLowerCase() == val.name.toLowerCase())
      $scope.theme = val;
  });

  $scope.bootswatchThemes = bootswatchThemes;

  $scope.modifyLessVar = function(key, val){
    less.modifyVars({ key: val });
  }
}
