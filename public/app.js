import moment from 'moment';
import { uiModules } from 'ui/modules';
import uiRoutes from 'ui/routes';

import 'ui/autoload/styles';
import './less/main.less';
import template from './templates/index.html';
//import { IndicesGetIndicesProvider } from 'ui/indices/get_indices';

uiRoutes.enable();
uiRoutes
.when('/', {
  template: template,
  controller: 'analyzeApiUiPluginController'
});

uiModules
.get('app/analyze-api-ui-plugin', [])
.controller('analyzeApiUiPluginController', function ($http, $scope, $route, $interval, chrome) {
  $scope.services = ['analyzer', 'custom_analyzer'];
  $scope.currentTab = $scope.services[0];
  $scope.title = 'Analyze Api Ui Plugin';
  $scope.description = 'UI for elasticsearch analyze API';

  $scope.formValues = {
    indexName: '',
    text: '',
    analyzer: '',
    tokenizer: '',
    charfilters: [{'item': '', 'id': 0}],
    filters: [{'item': '', 'id': 0}]
  };
  $scope.detail = {};
  $scope.show_result = false;

  // UI state.
  // FIXME change index name input to "select"
  //  this.indexNameOptions = [];
  //  this.indexNameOptionsError = null;

  // FIXME call _cat/indices and return indices list + no index name
  // just now, using text box instead of select

  // switch tab
  this.changeTab = (tab) => {
    $scope.currentTab = tab;
  };

  // add input of charfilter function
  this.addCharfilter = ($index) => {
      //TODO check not having '' in current charfilters
      $scope.formValues.charfilters.push({'item': '', 'id': $scope.formValues.charfilters.length});
  };
  // remove input of charfilter function
  this.removeCharfilter = ($index) => {
      $scope.formValues.charfilters.splice($index, 1);
  };

  // add input of filter function
  this.addFilter = ($index) => {
      //TODO check not having '' in current filters
      $scope.formValues.filters.push({'item': '', 'id': $scope.formValues.filters.length});
  };
  // remove input of charfilter function
  this.removeFilter = ($index) => {
      $scope.formValues.filters.splice($index, 1);
  };

  // Call analyze function
  this.performAnalyze = () => {
    // FIXME validation logic, text is required
    let param = {
      text: $scope.formValues.text
    };
    if ($scope.formValues.text.trim().length == 0) console.log("text is empty");
    if ($scope.formValues.indexName.length > 0)
      param.indexName = $scope.formValues.indexName.trim();
    if ($scope.currentTab == 'analyzer') {
      if ($scope.formValues.analyzer.length > 0)
        param.analyzer = $scope.formValues.analyzer.trim();
    } else {
      if ($scope.formValues.tokenizer) param.tokenizer = $scope.formValues.tokenizer.trim();
      // FIXME get tokenizer/char_filter/filter
      if ($scope.formValues.charfilters.length > 0) {
        $scope.formValues.charfilters.forEach(function (charfilter) {
          if (charfilter && charfilter.item && charfilter.item.trim().length > 0 ) {
            if(param.charfilters == null) param.charfilters = [];
            param.charfilters.push(charfilter.item.trim());
          }
        });
      }
      if ($scope.formValues.filters.length > 0) {
        $scope.formValues.filters.forEach(function (filter) {
          if (filter && filter.item && filter.item.trim().length > 0 ) {
            if(param.filters == null) param.filters = [];
            param.filters.push(filter.item.trim());
          }
        });
      }
    }

//    console.log(param);

    // call kibana server API
    $http.post(chrome.addBasePath('/api/analyze-api-ui-plugin/analyze'), param)
    .then(
      (response) => {
        $scope.detail = response.data;
        $scope.show_result = true;
    });
  };

});
