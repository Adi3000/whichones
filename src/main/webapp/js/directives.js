'use strict';

function selectLine(lineTag,lines,totals){
	var selectedLine = findLine(lines, lineTag.attr("data-line-id")); 
	if(selectedLine.selected){
		selectedLine.selected = false;
		$("input.checkbox",lineTag).prop("checked",false);
	}else{
		selectedLine.selected = true;
		$("input.checkbox",lineTag).prop("checked",true);
	}
	computeTotal(lines,totals);
}
var sectionEvenClass = "section-even";
var sectionOddClass = "section-odd";
var evenSection = true;
/* Directives */
var whichOnesDirectives = angular.module('whichOnesDirectives', ['whichOnesControllers'])
	.directive('toggleDiv',function($timeout) {
		return {
			restrict: 'A',
			link: function(scope, $element, attrs) {
				$timeout(function(){
					$element.click(function(){
						if($("#"+attrs.toggleDiv).is(":visible")){
							$("#"+attrs.toggleDiv).hide(200, function(){
								$element.children(".ui-icon")
									.removeClass("ui-icon-minus")
									.addClass("ui-icon-plus");
							});
						}else{
							$("#"+attrs.toggleDiv).show(200, function(){
								$element.children(".ui-icon")
								.addClass("ui-icon-minus")
								.removeClass("ui-icon-plus");
							});
						}
					});
					$element.css("cursor","pointer");
				});
			}
		};
	})
	.directive('toggleHidden', function($timeout){
		return {
			restrict: 'A',
			scope: true,
			link: function(scope, $element, attrs) {
				$timeout(function(){
					if($("#"+attrs.toggleHidden+" .to_hide").is("*")){
						$element.parent().click(function(){
							if($("#"+attrs.toggleHidden+" .to_hide").is(":visible")){
								$("#"+attrs.toggleHidden+" .to_hide").hide(200,function(){
									$element
										.removeClass("ui-icon-minusthick")
										.addClass("ui-icon-plusthick");
								}); 
							}else{
								$("#"+attrs.toggleHidden+" .to_hide").show(200,function(){
									$element
									.addClass("ui-icon-minusthick")
									.removeClass("ui-icon-plusthick");
								}); 
							}
						});
						$element.css("cursor","pointer");
					}else{
						$element.remove();
					}
				});
			}
		};
	})
	.directive('tooltip', function($timeout){
		return {
			restrict: 'A',
			link: function(scope, $element, attrs) {
				$timeout(function(){
					$element.powerTip({
						placement : 'n',
						mouseOnToPopup : true
					})
					.data('powertipjq', function(){
						var tip = $(this).parent().children(".tooltip").clone();
						tip.removeClass("tooltip");
						return tip;
					})
					.css({"border-bottom" : "1px dotted #999", "padding-bottom" : "-5px"});
				});
			}
		};
	})
	.directive('table', function($compile){
		return {
			restrict: 'A',
			scope: { sheet : '=', totals : '=', },
			link: function(scope,$element, attrs){
				scope.sheet.$promise.then(function(sheet){
					var footer = $("<tfoot />").append($("<tr />"));
					angular.forEach(sheet.headers,function(header,index){
						var totalValue = "";
						if(header.isValue){
							totalValue = "{{ totals."+index+" }}";
						}
						footer.children("tr:first")
							.append($("<td />")
								.text(totalValue));
					});
					footer.children("tr:first").prepend($("<td />").text(""));
					$element.append($compile(footer)(scope));
				});
			}
		};
	})
	.directive('manageLine', ['WhichOnesSheetService', function(WhichOnesSheetService){
		var manageLineTemplate = $("<div />")
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
			controller: function($scope, $element){
				$scope.remove = function(){
					if(confirm("whichones.msg.delete.confirm")){
						WhichOnesSheetService.deleteLine(line); 
					}
				};
				$scope.removeSection = function(){
					WhichOnesSheetService.removeSectionForLine(line); 
				};
				console.log($scope.line);
			}
		};
	}])
	.directive('line',function($compile){
		return {
			restrict: 'A',
			scope: { line : '='},
			link: function(scope,$element, attrs){
				var lines = $("#sheet tbody");
				var line = scope.line;
				var nbColumn = lines.attr("data-nb-columns");
				$element.append($compile($("<td />")
						.attr("data-manage-line","line"))(scope));
				if(!isEmpty(line.section)){
					if(!$element.prev("tr").is("*") || line.section.id != $element.prev("tr").attr("data-section-id")){
						evenSection = !evenSection;
						var sectionTag = $("<tr />")
							.attr("data-section-id", "{{line.section.id}}")
							.attr("data-section-index", "{{line.section.index}}")
							.addClass("sectionHeader")
							.append($("<th />")
									.attr("colspan",nbColumn)
									.attr("data-editable", "line.section.name")
									.addClass(evenSection ? sectionEvenClass : sectionOddClass)
							);
						$element.before($compile(sectionTag)(scope));
					}
					$element.addClass(evenSection ? sectionEvenClass : sectionOddClass);
					$element.attr("data-section-id", line.section.id);
				}else{
					angular.noop();
				}
				
				angular.forEach(line.data, function(datum, index){
					$element.append(
						$compile($("<td />")
							.attr("data-editable", "line.data["+index+"].value")
							.append($("<input />")
									.addClass("editable")
									.attr({
										"type": "text",
										"data-ng-model": "line.data["+index+"].value"										
									})))(scope));
				});
				if(line.selected){
					$("input.checkbox",$element).prop("checked",true);
				}
				$element
					.addClass("line")
					.attr({"data-selectable":"true","data-line-id" : line.id});
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
					selectLine($element, $scope.sheet.lines, $scope.$parent.totals);
				};
			}
		};
	});