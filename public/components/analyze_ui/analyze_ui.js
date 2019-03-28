import React, {
  Component,
  Fragment,
} from 'react';
import {
  EuiCallOut,
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
import {loadSavedState, saveState} from "../../services/state_handler";

export class AnalyzeUi extends Component {

  constructor(props) {
    super(props);
    const params = loadSavedState();
    this.state = {
      params: params,
      errors: {}
    };
    setHttpClient(this.props.httpClient);
  }

  clearErrors() {
    this.setState({
      errors: {}
    });
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
    console.log("in select tab function");
    console.log(params);
    this.updateParams(params);
    this.clearResults();
    this.clearErrors();
  };

  updateParams = params => {
    this.setState({
      params: params
    });
    saveState(this.state);
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
    const result = multiAnalyze(params);
    result.then(
      (response) => {
        this.setState({
          showResult: true,
          detail: response.data.resultAnalyzers,
          resultType: "multi"
        });
      }
    ).catch(
      error => {
        if (error.data) {
          if (error.data.statusCode == 404) {
            this.setState({
              errors: {
                indexNameError: error.data.message
              }
            })
          } else if (error.data.statusCode == 400) {
            this.setState({
              errors: {
                analyzerError: error.data.message
              }
            });
          } else {
            //TODO Notification
            console.error(error);
          }
        } else {
          //TODO Notification
          console.error(error);
        }
      }
    );
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
        if (error.data) {
          if (error.data.statusCode == 404) {
            this.setState({
              errors: {
                indexNameError: error.data.message
              }
            })
          } else if (error.data.statusCode == 400) {
            this.setState({
              errors: {
                analyzerError: error.data.message
              }
            });
          } else {
            //TODO
            console.error(error);
          }
        }
        console.error(error);
        //TODO Notification!
      }
    );
  }

  // render results
  displayResult = e => {
    this.clearErrors();
    this.clearResults();
    const {params} = this.state;
    const {tab} = this.state.params;
    const validatedParams = validateAnalyzeRequestValues(params);
    if (Object.keys(validatedParams.errors).length) {
      this.setState({
          errors: validatedParams.errors
      });
    } else {
      //collect current values from common form and analyzer form
      if (tab != TAB_NAME.COMPARE_ANALYZERS) {
        this.callAnalyzeApi(validatedParams.requestParams);
      } else {
        this.callMultiAnalyzeApi(validatedParams.requestParams);
      }
    }
  };

  renderCommonFormErrors() {
    const {errors} = this.state;
    if (!Object.keys(errors).includes("indexNameError") &&
      !Object.keys(errors).includes("textError")) {
      return;
    } else {
      return (
        <Fragment>
          <EuiCallOut
            iconType="alert"
            color="danger"
            title="Input errors"
          >
            Please check every inputs.
          </EuiCallOut>
          <EuiSpacer/>
        </Fragment>
      );
    }
  }

  renderAnalyzerErrors() {
    const {errors} = this.state;
    if (!Object.keys(errors).includes("analyzerError") &&
      !Object.keys(errors).includes("fieldError")) {
      return;
    } else {
      let target = "analyzer";
      const {tab} = this.state.params;
      if (tab == TAB_NAME.CUSTOM_ANALYZER) {
        target = "chafilter/tokenizer/filter";
      } else if (tab == TAB_NAME.FIELD) {
        target = "field";
      }
      return (
        <Fragment>
          <EuiCallOut
            iconType="alert"
            color="danger"
            title={target+" error"}
          >
            {this.state.errors.analyzerError}
            {this.state.errors.fieldError}
          </EuiCallOut>
          <EuiSpacer/>
        </Fragment>
      );
    }
  }

  render() {
    const {indexName} = this.state.params;
    return (
      <Fragment>
        {this.renderCommonFormErrors()}
        <CommonForm params={this.state.params}
                    errors={this.state.errors}
                    updateParamsWithEvent={this.updateParamsWithEvent}/>
        <EuiSpacer size="m"/>
        {this.renderAnalyzerErrors()}
        <AnalyzerForm params={this.state.params}
                      selectTab={this.selectTab}
                      updateParamsWithEvent={this.updateParamsWithEvent}
                      updateParamsWithEventAndIndex={this.updateParamsWithEventAndIndex}
        />
        <EuiSpacer size="m"/>
        <FormControl params={this.state.params}
                     errors={this.state.errors}
                     displayResult={this.displayResult}
                     updateParamsWithEvent={this.updateParamsWithEvent}
        />
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
