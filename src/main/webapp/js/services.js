'use strict';

/* Services */

var whichOnesServices = angular.module('whichOnesServices', ['ngResource'])
	.factory('WhichOnesData', ['$resource',
	   function($resource){
			return $resource('/rest/data', {tokenId: '@tokenId' }, {
				auth: {method:'POST', params:{password:'@password'}, isArray:false},
				getSample: {method:'GET', url:'/data/sample.json', isArray:false}				
			});
	   }
	])
	.service('WhichOnesSheetService', ['$rootScope', 'WhichOnesData', 
        function($rootScope, WhichOnesData){
			return {
				sheet : WhichOnesData.getSample(),
				saveSheet: function(){
					console.log(this.sheet);
					$rootScope.$broadcast( 'sheet.update' );
				},
				deleteLine: function(line){
					var index = findLineIndex(this.sheet.lines, line.id);
					delete this.sheet.lines[index];
					$rootScope.$broadcast( 'sheet.update' );
				},
				removeSectionForLine: function(line){
					var index = findLineIndex(this.sheet.lines, line.id);
					delete this.sheet.lines[index].section;
					$rootScope.$broadcast( 'sheet.update' );
				}
			};
		}
	]);