'use strict';

/* Services */

var whichOnesServices = angular.module('whichOnesServices', ['ngResource']);
whichOnesServices.factory('WhichOnesData', ['$resource',
   function($resource){
		return $resource('/rest/data', {tokenId: '@tokenId' }, {
			auth: {method:'POST', params:{password:'@password'}, isArray:false},
			getSample: {method:'GET', url:'/data/sample.json', isArray:false}				
		});
   }
]);