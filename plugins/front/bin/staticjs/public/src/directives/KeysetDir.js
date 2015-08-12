module.exports = function(app) {
  return app.directive('keyseteditor', [
    '$rootScope', 'ProviderService', 'KeysetService', function($rootScope, ProviderService, KeysetService) {
      return {
        restrict: 'AE',
        template: '<div></div>',
        replace: true,
        scope: {
          provider: '=',
          control: '='
        },
        link: function($scope, $element) {
          var $elt, update;
          $elt = $($element[0]);
          $scope.control = $scope.control;
          update = function() {
            return ProviderService.get($scope.provider).then(function(config) {
              var field, input, k, kk, param_config, selectize, values, vv, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _results;
              $scope.available_parameters = (config != null ? (_ref = config.oauth2) != null ? _ref.parameters : void 0 : void 0) || (config != null ? (_ref1 = config.oauth1) != null ? _ref1.parameters : void 0 : void 0) || (config != null ? config.parameters : void 0);
              $elt.html('');
              _results = [];
              for (k in $scope.available_parameters) {
                param_config = $scope.available_parameters[k];
                field = $(document.createElement('div'));
                $elt.append(field);
                field.append('<div><strong>' + k + '</strong></div>');
                if (((_ref2 = $scope.available_parameters[k]) != null ? _ref2.values : void 0) != null) {
                  values = [];
                  for (kk in $scope.available_parameters[k].values) {
                    vv = $scope.available_parameters[k].values[kk];
                    values.push({
                      name: kk,
                      value: vv
                    });
                  }
                  if ((param_config.cardinality != null) && param_config.cardinality === '*') {
                    input = $(document.createElement('input'));
                    field.append(input);
                    input.val((_ref3 = $scope.keyset) != null ? (_ref4 = _ref3.parameters) != null ? _ref4[k] : void 0 : void 0);
                    selectize = input.selectize({
                      delimiter: ' ',
                      persist: false,
                      valueField: 'name',
                      labelField: 'value',
                      searchField: ['name', 'value'],
                      options: values,
                      render: {
                        item: function(item, escape) {
                          return '<div><span class="name">' + item.name + '</span></div>';
                        },
                        option: function(item, escape) {
                          var desc, label;
                          label = item.name;
                          desc = item.value;
                          return '<div><div class="scope_name">' + escape(label) + '</div><div class="scope_desc">' + escape(desc) + '</div></div>';
                        },
                        create: function(input) {
                          return {
                            value: input,
                            text: input
                          };
                        }
                      }
                    });
                    (function(selectize, k) {
                      selectize = selectize[0].selectize;
                      return selectize.on('change', function() {
                        $scope.keyset.parameters[k] = this.getValue();
                        return $scope.control.change();
                      });
                    })(selectize, k);
                  }
                  if ((param_config.cardinality != null) && param_config.cardinality === '1') {
                    input = $(document.createElement('select'));
                    field.append(input);
                    selectize = input.selectize({
                      delimiter: ' ',
                      persist: false,
                      valueField: 'name',
                      labelField: 'value',
                      searchField: ['name', 'value'],
                      options: values,
                      render: {
                        item: function(item, escape) {
                          return '<div><span class="name">' + item.name + '</span></div>';
                        },
                        option: function(item, escape) {
                          var desc, label;
                          label = item.name;
                          desc = item.value;
                          return '<div><div class="scope_name">' + escape(label) + '</div><div class="scope_desc">' + escape(desc) + '</div></div>';
                        },
                        create: function(input) {
                          return {
                            value: input,
                            text: input
                          };
                        }
                      }
                    });
                    _results.push((function(selectize, k) {
                      var _ref5, _ref6;
                      selectize = selectize[0].selectize;
                      selectize.addItem((_ref5 = $scope.keyset) != null ? (_ref6 = _ref5.parameters) != null ? _ref6[k] : void 0 : void 0);
                      return selectize.on('change', function() {
                        $scope.keyset.parameters[k] = this.getValue();
                        return $scope.control.change();
                      });
                    })(selectize, k));
                  } else {
                    _results.push(void 0);
                  }
                } else {
                  input = $(document.createElement('input'));
                  field.append(input);
                  input.addClass('form-control');
                  input.val((_ref5 = $scope.keyset) != null ? (_ref6 = _ref5.parameters) != null ? _ref6[k] : void 0 : void 0);
                  _results.push((function(k, input) {
                    return input.change(function() {
                      $scope.keyset.parameters[k] = input.val();
                      return $scope.control.change();
                    });
                  })(k, input));
                }
              }
              return _results;
            }).fail(function(e) {
              return console.log(e);
            });
          };
          if ($scope.provider != null) {
            update();
          }
          $scope.$watch('provider', function() {
            if (($scope.app != null) && ($scope.provider != null)) {
              return update();
            }
          });
          $scope.control.getKeyset = function() {
            return $scope.keyset;
          };
          return $scope.control.setKeyset = function(keyset) {
            $scope.keyset = keyset;
            return update();
          };
        }
      };
    }
  ]);
};
