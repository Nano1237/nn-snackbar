angular.module('nnSnackbar',[])
		.directive('snackbar', SnackbarDirectiveFactory)
		.service('snackbar', SnackbarServiceSingleton);
/**
 * @ngdoc directive
 * @restrict E
 * @name main.directive:snackbar
 * @requires $rootScope
 * @requires $timeout
 */
function SnackbarDirectiveFactory($rootScope, $timeout) {
	return {
		restrict: 'E',
		template: '{{snackbarMessage}}',
		link: function (scope, element) {
			var hideTimeout, showTimeout;

			$rootScope.$on('SnackbarDirectiveFactoryShow', function (event, message, addClass) {
				console.log('show');
				hide();
				showTimeout = $timeout(function () {
					element.addClass(addClass || '');
					show(message);
					hideTimeout = $timeout(hide, 3000);
				}, 400);
			});

			element.on('click', hide);

			/**
			 * @description
			 * Shows the snackbar and adds the message body
			 * @param {string} message the message that should be shown
			 */
			function show(message) {
				element.css('bottom', '0');
				scope.snackbarMessage = message;
			}

			/**
			 * @description
			 * Hides the snackbar
			 */
			function hide() {
				$timeout.cancel(hideTimeout);
				$timeout.cancel(showTimeout);
				$timeout(function () {
					element[0].className = 'ng-binding';
				}, 400);
				element.css('bottom', '-50px');
			}

		}
	};


}

/**
 * @ngdoc service
 * @name main.service:snackbar
 * @requires $rootScope
 */
function SnackbarServiceSingleton($rootScope) {
	var snackbar = {
		show: show
	};
	return snackbar;

	/**
	 * @description
	 * shows the snackbar
	 * @param message
	 */
	function show(message, addClass) {
		$rootScope.$broadcast('SnackbarDirectiveFactoryShow', message, addClass);
	}

}