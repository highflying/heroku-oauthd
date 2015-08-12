module.exports = function(app) {
  return app.directive('domains', [
    "$rootScope", function($rootScope) {
      return {
        restrict: 'AE',
        templateUrl: '/templates/domains_chooser.html',
        replace: true,
        scope: {
          control: '=',
          app: '='
        },
        link: function($scope, $element) {
          var add_listener, k, remove_listener, selectize_elem, v, _ref, _ref1;
          selectize_elem = $($element[0]).selectize({
            delimiter: ' ',
            persist: false,
            create: function(input) {
              return {
                value: input,
                text: input
              };
            }
          });
          $scope.selectize = selectize_elem[0].selectize;
          $scope.control.getSelectize = function() {
            return $scope.selectize;
          };
          $scope.control.getDomains = function() {
            var domains, value;
            value = $scope.selectize.getValue();
            domains = value.split(' ');
            return domains;
          };
          if (((_ref = $scope.app) != null ? _ref.domains : void 0) != null) {
            _ref1 = $scope.app.domains;
            for (k in _ref1) {
              v = _ref1[k];
              $scope.selectize.addOption({
                text: v,
                value: v
              });
              $scope.selectize.addItem(v);
            }
          }
          add_listener = function() {
            return $scope.selectize.on('change', function() {
              var domains, value;
              value = $scope.selectize.getValue();
              domains = value.split(' ');
              $scope.app.domains = domains;
              if ($scope.control.change != null) {
                return $scope.control.change();
              }
            });
          };
          remove_listener = function() {
            return $scope.selectize.off('change');
          };
          $scope.control.refresh = function(app) {
            var _i, _len, _ref2;
            remove_listener();
            $scope.selectize.clear();
            if (app != null) {
              $scope.app = app;
            }
            _ref2 = $scope.app.domains;
            for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
              v = _ref2[_i];
              $scope.selectize.addOption({
                text: v,
                value: v
              });
              $scope.selectize.addItem(v);
            }
            return add_listener();
          };
          add_listener();
        }
      };
    }
  ]);
};
