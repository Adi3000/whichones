'use strict';

function computeTotal(lines,totals){
	angular.forEach(Object.keys(totals),function(index){
		totals[index] = 0;
	});
	angular.forEach(lines,function(line){
		if(line.selected){
			angular.forEach(Object.keys(totals),function(index){
				totals[index] = totals[index] + line.data[index].value;
			});
		}
	});
}
function selectLine(lineTag,lines,totals){
	var selectedLine = findLine(lines, lineTag.attr("data-line-id")); 
	if(selectedLine.selected){
		selectedLine.selected = false;
		lineTag.removeClass("selected-line");
		$("input.checkbox",lineTag).prop("checked",false);
	}else{
		selectedLine.selected = true;
		lineTag.addClass("selected-line");
		$("input.checkbox",lineTag).prop("checked",true);
	}
	computeTotal(lines,totals);
}
var sectionEvenClass = "section-even";
var sectionOddClass = "section-odd";
var evenSection = true;
/* Directives */
var whichOnesDirectives = angular.module('whichOnesDirectives', [])
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
					var headers = $("<thead />").append($("<tr />"));
					var footer = $("<tfoot />").append($("<tr />"));
					angular.forEach(sheet.headers,function(header,index){
						var totalValue = "";
						headers.children("tr:first")
							.append($("<th />")
									.text(header.name));
						if(header.isValue){
							totalValue = "{{ totals."+index+" }}";
						}
						footer.children("tr:first")
							.append($("<td />")
								.text(totalValue));
					});
					headers.children("tr:first").prepend($("<th />").text("*"));
					footer.children("tr:first").prepend($("<td />").text(""));
					$element.append(headers).append($compile(footer)(scope));
				});
			}
		};
	})
	.directive('line',function($compile){
		return {
			restrict: 'A',
			scope: { line : '='},
			link: function(scope,$element, attrs){
				var lines = $("#sheet tbody");
				var line = scope.line;
				var nbColumn = lines.attr("data-nb-columns");
				$element.append($("<td />").append(
						$("<input />")
							.attr("type","checkbox")
							.addClass("checkbox")));
				if(!isEmpty(line.section)){
					console.log($element.prev("tr"),$element.prev().attr("data-section-id"));
					if(!$element.prev("tr").is("*") || line.section.id != $element.prev("tr").attr("data-section-id")){
						evenSection = !evenSection;
						var sectionTag = $("<tr />")
							.append($("<th />")
									.attr("colspan",nbColumn)
									.attr("data-section-id", line.section.id)
									.addClass("sectionHeader")
									.addClass(evenSection ? sectionEvenClass : sectionOddClass)
									.text(line.section.name));
						$element.before(sectionTag);
					}
					$element.addClass(evenSection ? sectionEvenClass : sectionOddClass);
					$element.attr("data-section-id", line.section.id);
				}else{
					angular.noop();
				}
				angular.forEach(line.data, function(datum){
					console.log(datum);
					$element.append($("<td />")
							.text(datum.value));
				});
				if(line.selected){
					$element.addClass("selected-line");
					$("input.checkbox",$element).prop("checked",true);
				}
				$element
					.addClass("line")
					.attr({"data-selectable":"true","data-line-id" : line.id});
				console.log($element);
			}
		};
	})
	.directive('selectable', function($timeout){
		return {
			restrict: 'A',
			link: function($scope,$element, attrs){
				$timeout(function(){
					$element.click(function(){
						$scope.$apply(function(){
							selectLine($element, $scope.sheet.lines, $scope.$parent.totals);
						});
					});
				});
			}
		};
	});