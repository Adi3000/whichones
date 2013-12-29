'use strict';

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
	});