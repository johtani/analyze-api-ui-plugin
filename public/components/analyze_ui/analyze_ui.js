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
import {
  updateParamsWithEvent,
  updateParamsWithEventAndIndex,
  selectTab
} from "../store/params";

export class AnalyzeUi extends Component {

  constructor(props) {
    super(props);
    this.state = {
      params: {}
    }
  }


  updateParamsWithEvent = e => {
    const params = updateParamsWithEvent(e, this.state.params);
    this.updateParams(params);
  };

  updateParamsWithEventAndIndex = e => {
    console.log("updateParamsWithEventAndIndex");
    const params = updateParamsWithEventAndIndex(e, this.state.params);
    this.updateParams(params);
  };

  selectTab = tab => {
    const params = selectTab(tab, this.state.params);
    this.updateParams(params);
  };

  updateParams = params => {
    this.setState({
      params: params
    });
    console.log("state:");
    console.log(this.state);
  };


  callAnalyzeApi () {

  }

  callMultiAnalyzeApi () {

  }

  // view


  updateCommonForm = e => {

  }

  validateForm = () => {
    console.log("validation is not Implemented!!");
  };

  displayResult = e => {
    console.log("AnalyzeUi displayResult");
    this.validateForm();
    console.log(this.state);
    //collect current values from common form and analyzer form
  };

  displaySingleAnalyze = () => {

  };

  displayMultiAnalyze = () => {

  };

  render() {
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
      </Fragment>
    );
  }
}
