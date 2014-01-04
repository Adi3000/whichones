'use strict';

function selectLine(lineTag,sheet){
	var selectedLine = findLine(sheet.lines, lineTag.attr("data-line-id")); 
	if(selectedLine.selected){
		selectedLine.selected = false;
		$("input.checkbox",lineTag).prop("checked",false);
	}else{
		selectedLine.selected = true;
		$("input.checkbox",lineTag).prop("checked",true);
	}
	computeTotal(sheet.lines,sheet.headers);
}

var sectionEvenClass = "sectionEven";
var sectionOddClass = "sectionOdd";
var evenSection = true;
/* Directives */
var whichOnesDirectives = angular.module('whichOnesDirectives', ['whichOnesControllers'])
	.directive('manageSheet', ['WhichOnesSheetService', function(WhichOnesSheetService){
		var manageLineTemplate = $("<div />")
			.append(
				$("<span />")
					.attr("data-ng-click","addColumn()")
					.addClass("ui-icon ui-icon-plus"))
			.append(
				$("<span />")
					.attr("data-ng-click","addSection()")
					.addClass("ui-icon ui-icon-arrowreturn-1-s"))
			.append(
				$("<input />")
					.attr("type","checkbox")
					.addClass("checkbox")).html();
		return {
			restrict: 'A',
			template : manageLineTemplate,
			controller: function($scope, $element, $compile){
				$scope.addColumn = function(){
					WhichOnesSheetService.addColumn($scope.line); 
				};
			},
			link: function(scope,$element, attrs){
				$(".ui-icon",$element).click(function(e){
					e.stopPropagation();
				});
			}
		};
	}])
	.directive('manageLine', ['WhichOnesSheetService', function(WhichOnesSheetService){
		var manageLineTemplate = $("<div />")
			.append(
				$("<span />")
				.attr("data-ng-click","add()")
				.addClass("ui-icon ui-icon-plus"))
			.append(
				$("<span />")
				.attr("data-ng-click","remove()")
				.addClass("ui-icon ui-icon-trash"))
			.append(
				$("<span />")
				.attr("data-ng-click","removeSection()")
				.addClass("ui-icon ui-icon-arrowreturn-1-s"))
			.append(
				$("<input />")
				.attr("type","checkbox")
				.addClass("checkbox")).html();
		return {
			restrict: 'A',
			template : manageLineTemplate,
			controller: function($scope, $element, $compile){
				$scope.add = function(){
					WhichOnesSheetService.addLineAfter($scope.line); 
				};
				$scope.remove = function(){
					if(confirm("whichones.msg.delete.confirm")){
						WhichOnesSheetService.deleteLine($scope.line); 
						console.log($scope);
					}
				};
				$scope.removeSection = function(){
					WhichOnesSheetService.removeSectionForLine($scope.line); 
					console.log($element.parent("tr").removeClass("sectionOdd sectionEven"));
				};
			},
			link: function(scope,$element, attrs){
				if(scope.$parent.line.selected){
					$("input.checkbox",$element).prop("checked",true);
				}
				$(".ui-icon",$element).click(function(e){
					e.stopPropagation();
				});
			}
		};
	}])
	.directive('line',function($compile){
		return {
			restrict: 'A',
			scope: { line : '='},
			link: function(scope,$element, attrs){
				var line = scope.line;
				if(line.isSection){
					evenSection = !evenSection;
					$element.addClass(evenSection ? sectionEvenClass : sectionOddClass);
				}else{
					if(!angular.isUndefined(line.section)){
						$element.addClass(evenSection ? sectionEvenClass : sectionOddClass);
					}
				}
				
			}
		};
	})
	.directive('editable',[ 'WhichOnesSheetService', function(WhichOnesSheetService){
		var editorTemplate = 
			$("<div />")
				.addClass("editable")
				.append(
					$("<div />")
						.attr("data-ng-hide", "editing")
						.text("{{ value }}")
						.append(
							$("<span />")
								.addClass("ui-icon ui-icon-pencil")
								.attr("data-ng-click","edit()"))
				)
				.append($("<div />")
					.attr("data-ng-show", "editing")
					.append(
						$("<input />")
							.attr({
								"type": "text",
								"data-ng-model": "editingValue"
							}))
					.append(
						$("<span />")
							.addClass("save ui-icon ui-icon-check")
							.attr("data-ng-click","save()"))
					.append(
						$("<span />")
							.addClass("ui-icon ui-icon-closethick")
							.attr("data-ng-click","close()"))
				)
				.html();
		return {
			restrict: 'A',
			scope:{
				value : "=editable",
				modelToEdit : "@editable"
			},
	        template: editorTemplate,
	        controller: function($scope, $element){
	        	$scope.editing = false;
	        	$scope.editingValue = $scope.value;
	        	$scope.edit = function() {
	                $scope.editing = true;
	                $scope.editingValue = $scope.value;
	            };

	            $scope.close = function() {
	                $scope.editing = false;
		        	$scope.editingValue = $scope.value;
	            };

	            $scope.save = function() {
	            	$scope.value = $scope.editingValue;
	            	$scope.$watch($scope.modelToEdit,function(){WhichOnesSheetService.saveSheet();});
	                WhichOnesSheetService.saveSheet();
	                $scope.close();
	            };
	        },
			link: function(scope,$element, attrs){
				var editableZone = $(".ui-icon, input",$element);
				editableZone
					.click(function(e){
						e.stopPropagation();
					});
				$("input",$element).keydown(function (e){
				    if(e.keyCode == 13){
				        $(this).siblings(".save").click();
				        if($(this).parent("td").next("td").children("input").is(":visible")){
				        	$(this).parent("td").next("td").children("input").focus();
				        }
				    }
				});
				
			}
		};
					
	}])
	.directive('selectable', function($timeout){
		return {
			restrict: 'A',
			controller: function($scope,$element){
				$scope.select = function(){
					selectLine($element, $scope.sheet);
				};
			}
		};
	});