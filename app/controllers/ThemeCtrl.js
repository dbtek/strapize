function ThemeCtrl($scope, $routeParams, $http){

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
    // is it variable?
		if(rule.name && rule.name.indexOf('@') > -1) {
      var filename = rule.currentFileInfo.filename.split(rule.currentFileInfo.currentDirectory)[1];
			variables.push({rule:rule, filename: filename});
		}
		if(rule.root) {
			angular.forEach(rule.root.rules, function(nestedRule) {
				variables = variables.concat(getVariables(nestedRule));
			});
		}
    return variables;
	};

  var groupVariables = function(variables) {
    var groupedVars = {};
    angular.forEach(variables, function(variable) {
      if(!groupedVars[variable.filename])
        groupedVars[variable.filename] = [];
      groupedVars[variable.filename].push(variable.rule);
    })
    return groupedVars;
  };

  $scope.tryParseLess = function() {
  	if(!$scope.resourceLock.bootswatchLess && !$scope.resourceLock.bootswatchVariables && $scope.bootstrapLessContent)
	  	$scope.lessParser.parse($scope.bootstrapLessContent, function(error, result) {
	  		var variables = [];
				angular.forEach(result.rules, function(rule) {
					// import rule
					variables = variables.concat(getVariables(rule));
				});
        $scope.variableGroups = groupVariables(variables);
			});
  };

  $scope.customizer = {};
  $scope.customizer.colors = less.tree.colors;
}
