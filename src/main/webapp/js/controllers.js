'use strict';

/* Controllers */

/**Parses string formatted as YYYY-MM-DD to a Date object.
 * If the supplied string does not match the format, an 
 * invalid Date (value NaN) is returned.
 * @param {string} dateStringInRange format YYYY-MM-DD, with year in
 * range of 0000-9999, inclusive.
 * @return {Date} Date object representing the string.
 */
function parseISO8601(dateStringInRange) {
  var isoExp = /^\s*(\d{4})-(\d\d)-(\d\d)\s*$/,
      date = new Date(NaN), month,
      parts = isoExp.exec(dateStringInRange);

  if(parts) {
    month = +parts[2];
    date.setFullYear(parts[1], month - 1, parts[3]);
    if(month != date.getMonth() + 1) {
      date.setTime(NaN);
    }
  }
  return date;
}
function updateScopeSheet(sheet, $scope){
	$scope.totals = {};
	angular.forEach(sheet.headers, function(header,index){
		if(header.isValue){
			$scope.totals[index] = 0;
		}
	});
	computeTotal(sheet.lines, $scope.totals);
}
angular.module('whichOnesControllers', ['whichOnesServices'])
	.controller('DataController', ['$scope', 'WhichOnesSheetService',
        function($scope, WhichOnesSheetService){
			$scope.sheet = WhichOnesSheetService.sheet;
			$scope.totals = {};
			$scope.sheet.$promise.then(function(sheet){
				updateScopeSheet(sheet, $scope);
			});
			$scope.$on( 'sheet.update', function( event ) {
				updateScopeSheet($scope.sheet, $scope);
			});
			$scope.saveSheet = function(){
				console.log($scope.sheet);
			};
		}
	]);


