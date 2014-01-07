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
angular.module('whichOnesControllers', ['whichOnesServices'])
	.controller('WhichOnesSheetController', ['$scope', '$rootScope', 'WhichOnesSheetService',
        function($scope, $rootScope, WhichOnesSheetService){
			$scope.role = { "editor" : true };
			$scope.totals = {};
			$scope.sheet = WhichOnesSheetService.sheet;
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


