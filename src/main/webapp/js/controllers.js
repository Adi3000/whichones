'use strict';

/* Controllers */
function updateScopeSheet(sheet, $scope){
	angular.forEach(sheet.headers, function(header,index){
		if(header.isValue){
			header.total = 0;
		}
	});
	computeTotal(sheet.lines, sheet.headers);
}
angular.module('whichOnesControllers', ['whichOnesServices', 'ngRoute'])
	.controller('WhichOnesSheetController', ['$scope', '$rootScope', '$routeParams', 'WhichOnesSheetService',
        function($scope, $rootScope, $routeParams, WhichOnesSheetService){
			console.log($routeParams);
			var sheetToken = angular.isUndefined($routeParams.sheet) ? null : $routeParams.sheet;
			$scope.role = { "editor" : true };
			$scope.totals = {};
			$scope.sheet = WhichOnesSheetService.getSheet(sheetToken);
			WhichOnesSheetService.prepareSheet();
			$scope.$on( 'sheet.available', function( event ) {
				$scope.sections = WhichOnesSheetService.mapSections();
				$scope.sheet = WhichOnesSheetService.sheet;
				$scope.orderedLines = WhichOnesSheetService.getOrderedLine();
				updateScopeSheet($scope.sheet, $scope);
				$rootScope.$broadcast('sheet.ready');
			});
			$scope.$on( 'sheet.update', function( event ) {
				$scope.orderedLines = WhichOnesSheetService.getOrderedLine();
				updateScopeSheet($scope.sheet, $scope);
			});
			$scope.saveSheet = function(){
				console.log($scope.sheet);
			};
		}
	]);


