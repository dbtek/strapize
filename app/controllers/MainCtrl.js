var MainCtrl = function($scope, $http) {
	$scope.themes = ['Amelia','Cerulean','Cosmo','Cyborg','Flatly','Journal','Readable','Simplex','Slate','Spacelab','United','Yeti'];

	$http.get('/app/less/bootstrap-with-path.less')
	  .then(function(result) {
	    $scope.bootstrapLessContent = result.data;
	});
}