'use strict';

function orderSheet(sheet){
	var orderedSheet = [];
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

var whichOnesServices = angular.module('whichOnesServices', ['ngResource', 'pascalprecht.translate'])
	.factory('WhichOnesData', ['$resource',
	   function($resource){
			return $resource('/rest/data', {tokenId: '@tokenId' }, {
				auth: {method:'POST', params:{password:'@password'}, isArray:false},
				getNewSheet: {method:'GET', url:'/data/newSheet.json', isArray:false},		
				getSample: {method:'GET', url:'/data/sample.json', isArray:false},
				create: {method: 'POST'}
			});
	   }
	])
	.service('WhichOnesSheetService', ['$rootScope', 'WhichOnesData', '$translate',
        function($rootScope, WhichOnesData, $translate){
			return {
				sheet : null,
				getSheet : function (tokenId){
					if(tokenId == null){
						this.sheet = WhichOnesData.getNewSheet();
					}else{
						this.sheet = WhichOnesData.get({"tokenId" : tokenId});
					}
					return this.sheet;
				},
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
				mapSections : function(){
					var sections = {};
					var sheet = this.sheet;
					angular.forEach(sheet.lines,function(line, index){
						if(!angular.isUndefined(line.section)){
							if(angular.isUndefined(sections[line.section.id])){
								sections[line.section.id] = line.section;
							}
							line.section = sections[line.section.id] ;
						}
					});
					return sections;
				},
				saveSheet: function(){
					console.log(this.sheet);
					$rootScope.$broadcast( 'sheet.update' );
				},
				saveLine: function(id){
					console.log(findLine(this.sheet.lines, id));
					$rootScope.$broadcast( 'sheet.update' );
				},
				saveSection: function(section){
					console.log(section);
					$rootScope.$broadcast( 'sheet.update' );
				},
				create: function(sheet){
					
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
						newLine.data.push({"value" : "", "isNew" : true });
					});
					this.sheet.lines.push(newLine);
					$rootScope.$broadcast( 'sheet.update' );
				},
				addColumn: function(){
					this.sheet.headers.push({ "name" : $translate("HP_NEW_COLUMN"), "type" : "s1" , "isNew" : true });
					angular.forEach(this.sheet.lines, function(line){
						line.data.push({"value" : "", "isNew" : true});
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