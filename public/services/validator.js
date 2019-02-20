import {TAB_NAME} from "../common/constants/tab_names";

export function validateAnalyzeRequestValues(params) {
  let validatedParams = {
    requestParams: {
      text: params.text
    },
    errors: {}
  }
  const {tab} = params;
  if (validatedParams.requestParams.text.trim().length === 0) {
    validatedParams.error.textError= 'text should be not null!'

  }
  if (params.indexName.length > 0) {
    validatedParams.requestParams.indexName = params.indexName.trim();
  }

  if (tab == TAB_NAME.ANALYZER) {
    console.log("check analyzer tab");
    if (params.analyzer.length > 0) {
      console.log("check analyzer length");
      validatedParams.requestParams.analyzer = params.analyzer.trim();
    }
  } else if (tab == TAB_NAME.FIELD) {
    if (params.field.trim().length === 0)
      validatedParams.errors.analyzerError = 'field is required. ';
    if (params.indexName.trim().length === 0)
      validatedParams.errors.analyzerError += 'index name is required for "field". ';

    validatedParams.requestParams.field = params.field.trim();
  } else if (tab == TAB_NAME.CUSTOM_ANALYZER) {
    if (params.tokenizer) {
      let tmpObj = this.parseCustom(params.tokenizer.trim(), "tokenizer", validatedParams);
      if (tmpObj != -1) {
        validatedParams.requestParams.tokenizer = tmpObj;
        tmpObj = null;
      }
    }

    if (params.charfilters.length > 0) {
      params.charfilters.forEach( (charfilter) => {
        if (charfilter && charfilter.item && charfilter.item.trim().length > 0 ) {
          if(validatedParams.requestParams.charfilters == null) validatedParams.requestParams.charfilters = [];
          let tmpCharfilter = this.parseCustom(charfilter.item.trim(), "charfilter", validatedParams);
          if (tmpCharfilter != -1) {
            validatedParams.requestParams.charfilters.push(tmpCharfilter);
          }
        }
      });
    }
    if (params.filters.length > 0) {
      params.filters.forEach( (filter) => {
        if (filter && filter.item && filter.item.trim().length > 0 ) {
          if(validatedParams.requestParams.filters == null) validatedParams.requestParams.filters = [];
          let tmpFilter = this.parseCustom(filter.item.trim(), "filter", validatedParams);
          if (tmpFilter != -1) {
            validatedParams.requestParams.filters.push(tmpFilter);
          }
        }
      });
    }
  } else if (tab == TAB_NAME.COMPARE_ANALYZERS) {
    params.analyzersForCompare.forEach( (analyzer) => {
      if (!(analyzer && analyzer.item && analyzer.item.trim().length > 0)) {
        console.log("some analyzer is null");
      }
    });
  }
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