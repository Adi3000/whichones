'use strict';

function orderSheet(sheet){
	var orderedSheet = [];
	console.log(sheet);
	console.log(sheet.lines);
	angular.forEach(sheet.lines,function(line, index){
		if(!angular.isUndefined(line.section)){
			if( index == 0
				(index > 0 && (angular.isUndefined(sheet.lines[index-1].section) ||
						line.section.id  == sheet.lines[index-1].section.id) )){
				orderedSheet.push({"isSection" : true, "name" : line.section.name });
			}
			orderedSheet.push(line);
		}
	});
}

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
				getOrderedLine :  function(){
					var orderedSheet = new Array();
					var sheet = this.sheet;
					angular.forEach(sheet.lines,function(line, index){
						if(!angular.isUndefined(line.section)){
							if( index == 0 ||
								(index > 0 && (angular.isUndefined(sheet.lines[index-1].section) ||
										line.section.id  != sheet.lines[index-1].section.id) )){
								orderedSheet.push({"isSection" : true, "section" : { "name" : line.section.name , "id" : line.section.id } });
							}
						}
						orderedSheet.push(line);
					});
					return orderedSheet;
				},
				saveSheet: function(){
					console.log(this.sheet);
					$rootScope.$broadcast( 'sheet.update' );
				},
				prepareSheet: function(){
					this.sheet.$promise.then(function(sheet){
						$rootScope.$broadcast( 'sheet.available' );
					});
				},
				deleteLine: function(line){
					var index = findLineIndex(this.sheet.lines, line.id);
					this.sheet.lines.splice(index,1);
					$rootScope.$broadcast( 'sheet.update' );
				},
				addLineAfter: function(line){
					var newLine = { "data" : new Array()};
					if(!angular.isUndefined(line.section)){
						newLine.section = { "name" : line.section.name,  "id" : line.section.id };
					}
					angular.forEach(line.data,function(datum){
						newLine.data.push({"value" : "" });
					});
					this.sheet.lines.push(newLine);
					$rootScope.$broadcast( 'sheet.update' );
				},
				addColumn: function(){
					this.sheet.headers.push({ "name" : "New column", "type" : "s1" });
					angular.forEach(this.sheet.lines, function(line){
						line.data.push({"value" : ""});
					});
					console.log(this.sheet);
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