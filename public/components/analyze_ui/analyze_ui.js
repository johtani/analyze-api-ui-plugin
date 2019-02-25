import React, {
  Component,
  Fragment,
} from 'react';
import {
  EuiSpacer,
} from '@elastic/eui'

import { CommonForm } from "../common_form";
import { AnalyzerForm } from "../analyzer_form";
import { FormControl } from "../form_control";
import { Result } from "../result";
import {
  updateParamsWithEvent,
  updateParamsWithEventAndIndex,
  selectTab
} from "../../services/params";
import {
  setHttpClient,
  analyze,
  multiAnalyze
} from "../../services/api";
import {validateAnalyzeRequestValues} from "../../services/validator";
import {TAB_NAME} from "../../common/constants/tab_names";

export class AnalyzeUi extends Component {

  constructor(props) {
    super(props);
    this.state = {
      params: {
        indexName: '',
        text: '',
        analyzer: '',
        tokenizer: '',
        charfilters: [],
        filters: [],
        field: '',
        analyzersForCompare: [],
        showAllTokenAttr: false,
      }
    }
    setHttpClient(this.props.httpClient);
  }


  updateParamsWithEvent = e => {
    const params = updateParamsWithEvent(e, this.state.params);
    this.updateParams(params);
  };

  updateParamsWithEventAndIndex = e => {
    const params = updateParamsWithEventAndIndex(e, this.state.params);
    this.updateParams(params);
  };

  selectTab = tab => {
    const params = selectTab(tab, this.state.params);
    this.updateParams(params);
    this.clearResults();
  };

  updateParams = params => {
    this.setState({
      params: params
    });
  };

  clearResults() {
    if (this.state.detail) {
      this.setState({
        "detail": {},
        "showResult": false,
        "esRequest": ""
      });
    }
  }


  callMultiAnalyzeApi (params) {

  }

  callAnalyzeApi (params) {
    const result = analyze(params);

    result.then(
      (response) => {
        this.setState({
          showResult: true,
          detail: response.data.detail,
          esRequest: response.data.request,
          resultType: "single"
        });
      }
    );
    result.catch(
      error => {
        console.log("error!")
        console.log(error);
        if (error.data.statusCode == 404) {
          this.setState({
            indexNameError: error.data.message
          })
        } else if (error.data.statusCode == 400) {
          this.setState({
            analyzerError: error.data.message
          });
        } else {
          //TODO
          console.log("Notifications!!!");
        }
        console.error(error);
        //TODO Notification!
      }
    );
  }

  // view

  displayResult = e => {
    const {params} = this.state;
    const {tab} = this.state;
    const validatedParams = validateAnalyzeRequestValues(params);
    if (validatedParams.errors && validatedParams.errors.size > 0) {
      console.log("There are something wrong...");
      console.log(validatedParams.errors);
    }
    //collect current values from common form and analyzer form
    if (tab !== TAB_NAME.COMPARE_ANALYZERS) {
      this.callAnalyzeApi(validatedParams.requestParams);
    } else {
      this.callMultiAnalyzeApi(validatedParams.requestParams);
    }
  };

  render() {
    const {indexName} = this.state.params;
    return (
      <Fragment>
        <CommonForm params={this.state.params}
                    updateParamsWithEvent={this.updateParamsWithEvent}/>
        <EuiSpacer size="m"/>
        <AnalyzerForm params={this.state.params}
                      selectTab={this.selectTab}
                      updateParamsWithEvent={this.updateParamsWithEvent}
                      updateParamsWithEventAndIndex={this.updateParamsWithEventAndIndex}
        />
        <EuiSpacer size="m"/>
        <FormControl params={this.state.params}
                     displayResult={this.displayResult}
                     updateParamsWithEvent={this.updateParamsWithEvent}/>

        <EuiSpacer size="m"/>
        {this.state.showResult && (
          <Result
            showAllTokenAttr={this.state.params.showAllTokenAttr}
            type={this.state.resultType}
            detail={this.state.detail}
            esRequest={this.state.esRequest}
            indexName={indexName}
          />
        )}
      </Fragment>
    );
  }
}
