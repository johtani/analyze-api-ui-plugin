import {TAB_NAME} from "../common/constants/tab_names";

export function validateAnalyzeRequestValues(params) {
  let validatedParams = {
    requestParams: {
      text: params.text
    },
    errors: {}
  };
//  console.log("before validation");
//  console.log(params);
//  console.log("--------------");
  if (validatedParams.requestParams.text.trim().length === 0) {
    validatedParams.errors.textError= 'text should be not null!'

  }
  if (params.indexName.length > 0) {
    validatedParams.requestParams.indexName = params.indexName.trim();
  }

  if (params.tab == TAB_NAME.ANALYZER) {
    if (params.analyzer.length > 0) {
      validatedParams.requestParams.analyzer = params.analyzer.trim();
    }
  } else if (params.tab == TAB_NAME.FIELD) {
    if (params.field.trim().length === 0)
      validatedParams.errors.fieldError = 'field is required. ';
    if (params.indexName.trim().length === 0)
      validatedParams.errors.indexNameError = 'index name is required for "field". ';

    validatedParams.requestParams.field = params.field.trim();
  } else if (params.tab == TAB_NAME.CUSTOM_ANALYZER) {
    if (params.tokenizer) {
      let tmpObj = parseCustom(params.tokenizer.trim(), "tokenizer", validatedParams);
      if (tmpObj != -1) {
        validatedParams.requestParams.tokenizer = tmpObj;
        tmpObj = null;
      }
    }

    if (params.charfilters.length > 0) {
      params.charfilters.forEach( (charfilter) => {
        if (charfilter && charfilter.trim().length > 0 ) {
          if(validatedParams.requestParams.charfilters == null) validatedParams.requestParams.charfilters = [];
          let tmpCharfilter = parseCustom(charfilter.trim(), "charfilter", validatedParams);
          if (tmpCharfilter != -1) {
            validatedParams.requestParams.charfilters.push(tmpCharfilter);
          }
        }
      });
    }
    if (params.filters.length > 0) {
      params.filters.forEach( (filter) => {
        if (filter && filter.trim().length > 0 ) {
          if(validatedParams.requestParams.filters == null) validatedParams.requestParams.filters = [];
          let tmpFilter = parseCustom(filter.trim(), "filter", validatedParams);
          if (tmpFilter != -1) {
            validatedParams.requestParams.filters.push(tmpFilter);
          }
        }
      });
    }
  } else if (params.tab == TAB_NAME.COMPARE_ANALYZERS) {
    params.analyzersForCompare.forEach( (analyzer) => {
      if (analyzer && analyzer.trim().length > 0) {
        if (validatedParams.requestParams.analyzers == null) validatedParams.requestParams.analyzers = [];
        validatedParams.requestParams.analyzers.push(analyzer);
      }
    });
  }

  //console.log("after validation");
  //console.log(validatedParams);
  //console.log("--------------");
  return validatedParams;
};

function parseCustom(target, label, validatedParams) {
  if (typeof target === 'string' && target.startsWith('{')) {
    try {
      let tmpJson = JSON.parse(target);
      if (tmpJson !== null && typeof tmpJson === 'object') {
        return tmpJson;
      } else {
        validatedParams.errors.analyzerError = label+' has wrong custom '+label;
        return -1;
      }
    } catch (e) {
      validatedParams.errors.analyzerError = e.message;
      return -1;
    }
  } else {
    return target;
  }
};
