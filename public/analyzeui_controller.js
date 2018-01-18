import utils from "./utils";

export function analyzeApiUiPluginController($http, $scope, $timeout, chrome, Notifier) {
  const notify = new Notifier();
  $scope.services = ['analyzer', 'custom_analyzer', 'field', 'compare analyzers'];
  $scope.currentTab = $scope.services[0];
  $scope.title = 'Analyze Api Ui Plugin';
  $scope.description = 'UI for elasticsearch analyze API';
  $scope.showAllAttr = false;

  // load formValues & currentTab from sessionStorage
  utils.loadSavedState($scope);

  let timer;
  const saveDelay = 500;

  function saveState() {
    if (timer) {
      timer = $timeout.cancel(timer);
    }
    timer = $timeout(utils.saveState, saveDelay, true, $scope);
  }

  $scope.$watch('formValues', saveState, true);
  $scope.$watch('currentTab', saveState);

  this.initializeError = () => {
    $scope.detail = {};
    $scope.show_result = false;
    $scope.esrequest = {};
    $scope.show_esrequest = false;
    $scope.textError = null;
    $scope.indexNameError = null;
    $scope.analyzerError = null;
    $scope.resultAnalyzers = [];
  }

  this.alwaysShowTokenProperties = [
    "token",
    "position"
  ];
  this.hiddenTokenProperties = [
    "bytes","pronunciation (en)", "reading (en)", "partOfSpeech (en)", "inflectionType (en)", "inflectionForm (en)"
  ];

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

  // add input of analyzer function
  this.addAnalyzer = ($index) => {
    //TODO check not having '' in current analyzers
    $scope.formValues.analyzersForCompare.push({'item': '', 'id': $scope.formValues.charfilters.length});
  };
  // remove input of analyzer function
  this.removeAnalyzer = ($index) => {
    $scope.formValues.analyzersForCompare.splice($index, 1);
  };

  //
  this.parseCustom = (target) => {
    if (typeof target === 'string' && target.startsWith('{')) {
      try {
        var tmpJson = JSON.parse(target);
        if (tmpJson !== null && typeof tmpJson === 'object') {
          return tmpJson;
        } else {
          $scope.analyzerError = 'charfilter has wrong custom charfilter';
          return -1;
        }
      } catch (e) {
        $scope.analyzerError = e.message;
        return -1;
      }
    } else {
      return target;
    }
  };

  // show short name
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

  // compare and swap tokenStreamLength
  this.getLength = (current, tokenArray) => {
    // FIXME check if there is synonyms or compound
    var length = current;
    if (tokenArray != null) {
      // FIXME must consider the situation if positionIncrements != 1
      if (tokenArray[tokenArray.length -1].position >= current) {
        length = tokenArray[tokenArray.length -1].position + 1;
      }
    }
    return length;
  };

  // for display
  this.getTokenFromTokenstream = (index, target1, target2) => {
    var target = target1;
    if (target == null && target2 != null) {
      target = target2;
    }
    $scope.currentLevelTokenList = [];
    for (var token of target.tokens) {
      if (token.position > index) {
        break;
      }
      if (token.position == index) {
        $scope.currentLevelTokenList.push(token);
      }
    }
    return $scope.currentLevelTokenList.length > 0;
  }

  // filter token properties
  this.filteredCurrentTokenInfo = (token) => {
    if (token != null) {
      var result = {};
      Object.keys(token).forEach((key) => {
        if (!this.hiddenTokenProperties.includes(key)) {
          result[key] = token[key];
        }
      });
      return result;
    } else {
      return null;
    }
  };

  // switch show/hide properties
  this.hideTokenProperty = (propertyName) => {
    if (this.alwaysShowTokenProperties.includes(propertyName)) {
      return true;
    } else {
      // TODO should we handle each attribute to show/hide?
      return $scope.showAllAttr;
    }
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
      $scope.textError = 'text should be not null!';
      return;
    }
    if ($scope.formValues.indexName.length > 0)
      param.indexName = $scope.formValues.indexName.trim();

    if ($scope.currentTab == 'analyzer') {
      if ($scope.formValues.analyzer.length > 0)
        param.analyzer = $scope.formValues.analyzer.trim();
    } else if ($scope.currentTab == 'field') {
      if ($scope.formValues.field.trim().length == 0)
        $scope.analyzerError = 'field is required. ';
      if ($scope.formValues.indexName.trim().length == 0)
        $scope.analyzerError += 'index name is required for "field". ';
      if ($scope.analyzerError) {
        return;
      }
      param.field = $scope.formValues.field.trim();
    } else if ($scope.currentTab == 'custom_analyzer'){
      if ($scope.formValues.tokenizer) {
        var tmpObj = this.parseCustom($scope.formValues.tokenizer.trim());
        if (tmpObj != -1) {
          param.tokenizer = tmpObj;
          tmpObj = null;
        } else {
          return;
        }
      }
      // FIXME get tokenizer/char_filter/filter
      if ($scope.formValues.charfilters.length > 0) {
        $scope.formValues.charfilters.forEach( (charfilter) => {
          if (charfilter && charfilter.item && charfilter.item.trim().length > 0 ) {
            if(param.charfilters == null) param.charfilters = [];
            var tmpCharfilter = this.parseCustom(charfilter.item.trim());
            if (tmpCharfilter != -1) {
              param.charfilters.push(tmpCharfilter);
            } else {
              return;
            }
          }
        });
      }
      if ($scope.formValues.filters.length > 0) {
        $scope.formValues.filters.forEach( (filter) => {
          if (filter && filter.item && filter.item.trim().length > 0 ) {
            if(param.filters == null) param.filters = [];
            var tmpFilter = this.parseCustom(filter.item.trim());
            if (tmpFilter != -1) {
              param.filters.push(tmpFilter);
            } else {
              return;
            }
          }
        });
      }
    } else if ($scope.currentTab == 'compare analyzers') {
      $scope.formValues.analyzersForCompare.forEach( (analyzer) => {
        if (!(analyzer && analyzer.item && analyzer.item.trim().length > 0)) {
          console.log("some analyzer is null");
          return;
        }
      });
    }

    if ($scope.currentTab !== 'compare analyzers'){
      // call kibana server API
      $http.post(chrome.addBasePath('/api/analyze-api-ui-plugin/analyze'), param)
        .then(
          (response) => {
            $scope.detail = response.data.detail;
            this.countTokenSteamLength(response.data.detail);
            $scope.esrequest = response.data.request;
            $scope.show_esrequest = true;
            $scope.show_result = true;
            $scope.showAllAttr = false;
          })
        .catch( error => {
          if (error.data.statusCode == 404) {
            $scope.indexNameError = error.data.message;
          } else if (error.data.statusCode == 400) {
            $scope.analyzerError = error.data.message;
          } else {
            notify.error(error.data);
          }
        });
    } else {
      console.log("comparing!!!");
      // multiple analyzers
      param.analyzers = $scope.formValues.analyzersForCompare;

      $http.post(chrome.addBasePath('/api/analyze-api-ui-plugin/multi_analyze'), param)
        .then(
          (response) => {
            $scope.resultAnalyzers = response.data.resultAnalyzers;
            $scope.show_result = true;
            var tokenStreamLength = 0;
            $scope.resultAnalyzers.forEach( (result) => {

              tokenStreamLength = this.getLength(tokenStreamLength, result.tokens);
              $scope.tokenIndicesArray = [];
              for (var i = 0; i < tokenStreamLength; i++) {
                $scope.tokenIndicesArray.push(i);
              }
            });
          })
        .catch( error => {
          if (error.data.statusCode == 404) {
            $scope.indexNameError = error.data.message;
          } else if (error.data.statusCode == 400) {
            $scope.analyzerError = error.data.message;
          } else {
            notify.error(error.data);
          }
        });
    }
  };

}