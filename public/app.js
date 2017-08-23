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
.controller('analyzeApiUiPluginController', function ($http, $scope, $route, $interval, chrome, Notifier) {
  const notify = new Notifier();
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
  this.initializeError = () => {
    $scope.detail = {};
    $scope.show_result = false;
    $scope.textError = null;
    $scope.indexNameError = null;
    $scope.analyzerError = null;
  }

  this.hiddenTokenProperties = [
    "bytes","pronunciation (en)", "reading (en)", "partOfSpeech (en)", "inflectionType (en)", "inflectionForm (en)"
  ];

  // UI state.
  // FIXME change index name input to "select"
  //  this.indexNameOptions = [];
  //  this.indexNameOptionsError = null;

  // FIXME call _cat/indices and return indices list + no index name
  // just now, using text box instead of select

  // switch tab
  this.changeTab = (tab) => {
    $scope.currentTab = tab;
    this.initializeError();
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
    // initialize
    this.initializeError();

    // FIXME validation logic, text is required
    let param = {
      text: $scope.formValues.text
    };
    if ($scope.formValues.text.trim().length == 0) {
      $scope.textError = 'text shoud be not null!';
      return;
    }
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
        $scope.formValues.filters.forEach( (filter) => {
          if (filter && filter.item && filter.item.trim().length > 0 ) {
            if(param.filters == null) param.filters = [];
            param.filters.push(filter.item.trim());
          }
        });
      }
    }

    this.shortenName = (name) => {
      if (name.indexOf('.') > 0) {
        return name.substr(name.lastIndexOf('.')+1);
      }
      return name;
    }

    // count tokenstream length
    this.countTokenSteamLength = (detail) => {
      // FIXME tokens length is not fit if it has synonym token/compound token...
      var tokenStreamLength = 0;

      if (detail.tokenizer) {
        tokenStreamLength = this.getLength(tokenStreamLength, detail.tokenizer.tokens);
      } else if (detail.analyzer) {
        tokenStreamLength = this.getLength(tokenStreamLength, detail.analyzer.tokens);
      }
      if (detail.tokenfilters) {
        detail.tokenfilters.forEach( (filter) => {
          tokenStreamLength = this.getLength(tokenStreamLength, filter.tokens);
        });
      }
      $scope.tokenIndicesArray = [];
      for (var i = 0; i < tokenStreamLength; i++) {
        $scope.tokenIndicesArray.push(i);
      }
    };

    this.getLength = (current, tokenArray) => {
      var length = current;
      if (tokenArray != null) {
        length = tokenArray.length;
        if (tokenArray[tokenArray.length -1].position > length) {
          length = tokenArray[tokenArray.length -1].position;
        }
      }
      return length;
    };

    this.getTokenFromTokenstream = (index, target1, target2) => {
      var target = target1;
      console.log('hogehoge');
      console.log(index);
      console.log(target1);
      console.log(target2);
      if (target == null && target2 != null) {
        target = target2;
      }
      console.log(target);
      console.log('------');
      $scope.currentTokenInfo = null;
      for (var token of target.tokens) {
        if (token.position > index) {
          break;
        }
        if (token.position == index) {
          $scope.currentTokenInfo = token;
          break;
        }
      }
      console.log($scope.currentTokenInfo);
      return $scope.currentTokenInfo != null;
    }

    this.filteredCurrentTokenInfo = (token) => {
      console.log(token);
      if (token != null) {
        var result = {};
        console.log("call filteredCurrentTokenInfo");
        Object.keys(token).forEach((key) => {
          console.log(key);
          if (!this.hiddenTokenProperties.includes(key)) {
            result[key] = token[key];
          }
        });
        console.log(result);
        return result;
      } else {
        return null;
      }
    };

    // call kibana server API
    $http.post(chrome.addBasePath('/api/analyze-api-ui-plugin/analyze'), param)
    .then(
      (response) => {
        $scope.detail = response.data;
        this.countTokenSteamLength(response.data);
        $scope.show_result = true;
    })
    .catch( error => {
//      console.log(error);
      if (error.data.statusCode == 404) {
        $scope.indexNameError = error.data.message;
      } else if (error.data.statusCode == 400) {
        $scope.analyzerError = error.data.message;
      } else {
        notify.error(error.data);
      }
    });
  };

});
