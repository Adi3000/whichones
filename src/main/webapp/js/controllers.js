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

angular.module('whichOnesControllers', ['whichOnesServices'])
	.controller('DataController', ['$scope', 'WhichOnesData',
        function($scope, WhichOnesData){
			$scope.sheet = WhichOnesData.getSample();
			$scope.totals = {};
			$scope.sheet.$promise.then(function(sheet){
				angular.forEach($scope.sheet.headers, function(header,index){
					if(header.isValue){
						$scope.totals[index] = 0;
					}
				});
				computeTotal(sheet.lines, $scope.totals);
			});
		}
	]);


