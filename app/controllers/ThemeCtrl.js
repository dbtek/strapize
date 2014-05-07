function ThemeCtrl($scope, $routeParams, $resource, $http){

  $scope.theme = $routeParams.themeName;

  $scope.modifyLessVar = function(key, val){
    less.modifyVars({ key: val });
  }

  $scope.lessParser = new less.Parser();

  $scope.resourceLock = {
  	bootswatchLess: true,
  	bootswatchVariables: true
  }

  $http.get('/assets/components/bootswatch/'+$scope.theme+'/bootswatch.less')
	  .then(function(result) {
	    bootswatchLess = result.data;
	    $scope.resourceLock.bootswatchLess = false;
	    $scope.tryParseLess();
	});

	$http.get('/assets/components/bootswatch/'+$scope.theme+'/variables.less')
	  .then(function(result) {
	    bootswatchVariables = result.data;
	    $scope.resourceLock.bootswatchVariables = false;
	    $scope.tryParseLess();
	});

	/**
	 * Recursive variable iterator;
	 */
	var getVariables = function(rule) {
		var variables = [];
		if(rule.name) {
			//console.log(rule.name, rule.value);
			variables.push(rule)
			return variables;
		}
		if(rule.root) {
			angular.forEach(rule.root.rules, function(nestedRule) {
				variables.concat(getVariables(nestedRule));
			});
			return variables;
		}
	};

  $scope.tryParseLess = function() {
  	if(!$scope.resourceLock.bootswatchLess && !$scope.resourceLock.bootswatchVariables && $scope.bootstrapLessContent)
	  	$scope.lessParser.parse($scope.bootstrapLessContent, function(error, result) {
	  		var variables = [];
				angular.forEach(result.rules, function(rule) {
					// import rule
					variables.concat(getVariables(rule));
				});
			});
  };

  $scope.customizer = {};
  $scope.customizer.colors = less.tree.colors;
}
