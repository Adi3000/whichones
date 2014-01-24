'use strict';

angular.module('whichOnesControllers', ['whichOnesServices', 'ngRoute'])
	.controller('WhichOnesSheetController', ['$scope', '$rootScope', '$location', 'WhichOnesSheetService',
        function($scope, $rootScope, $location, WhichOnesSheetService){
			var sheetToken = angular.isUndefined($location.search().sheet) ? null : $location.search().sheet;
			$scope.role = { "editor" : true };
			$scope.totals = {};
			//Load that sheet
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
				WhichOnesSheetService.saveSheet();
				console.log($scope.sheet);
			};
			$scope.create = function(){
				WhichOnesSheetService.createSheet($scope.sheet);
				console.log($scope.sheet);
			};
			$scope.$on('code.available', function(e){
				var sample = angular.isUndefined($location.search().sheet) ? null : $location.search().sheet;
				$scope.sheet = WhichOnesSheetService.getSheet(sample);
				WhichOnesSheetService.prepareSheet();
			});
		}
	]);

