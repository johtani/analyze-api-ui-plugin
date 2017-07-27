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
  $scope.title = 'Analyze Api Ui Plugin';
  $scope.description = 'UI for elasticsearch analyze API';

  $scope.formValues = {
    indexName: '',
    text: '',
    analyzer: ''
  };
  $scope.detail = {};
  $scope.show_result = false;

  // UI state.
  // FIXME change index name input to "select"
  //  this.indexNameOptions = [];
  //  this.indexNameOptionsError = null;

  // FIXME call _cat/indices and return indices list + no index name
  // just now, using text box instead of select


  // FIXME call _analyze API
  this.performAnalyze = () => {

    // FIXME validation logic, text is required
    let param = {
      text: this.formValues.text
    };
    if (this.formValues.indexName) param.indexName = this.formValues.indexName.trim();
    if (this.formValues.analyzer) param.analyzer = this.formValues.analyzer.trim();

    // call kibana server API
    $http.post(chrome.addBasePath('/api/analyze-api-ui-plugin/analyze'), param)
    .then(
      (response) => {
        $scope.detail = response.data;
        $scope.show_result = true;
    });
  };
});
