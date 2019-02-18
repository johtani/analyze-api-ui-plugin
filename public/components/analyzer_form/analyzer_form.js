import React, {
  Component,
  Fragment
} from 'react';

import {
  EuiTabbedContent,
  EuiSpacer,
} from '@elastic/eui';

import { SimpleAnalyzer } from './simple';
import { CustomAnalyzer } from './custom';
import { FieldAnalyzer } from './field';
import { CompareAnalyzers } from './compare_analyzers';

export class AnalyzerForm extends Component {

  constructor(props) {
    super(props);
    this.tabs = [{
      id: 'analyzer',
      name: 'Analyzer',
      content: (
        <Fragment>
          <EuiSpacer/>
          <SimpleAnalyzer updateParamsWithEvent={this.props.updateParamsWithEvent}/>
        </Fragment>
      )
    }, {
      id: 'custom_analyzer',
      name: 'Custom Analyzer',
      content: (
        <Fragment>
          <EuiSpacer/>
          <CustomAnalyzer
            updateParamsWithEvent={this.props.updateParamsWithEvent}
            updateParamsWithEventAndIndex={this.props.updateParamsWithEventAndIndex}
          />
        </Fragment>
      )
    }, {
      id: 'field',
      name: 'Field',
      content: (
        <Fragment>
          <EuiSpacer/>
          <FieldAnalyzer updateParamsWithEvent={this.props.updateParamsWithEvent}/>
        </Fragment>
      )
    }, {
      id: 'compare_analyzers',
      name: 'Compare Analyzers',
      content: (
        <Fragment>
          <EuiSpacer/>
          <CompareAnalyzers updateParamsWithEvent={this.props.updateParamsWithEvent}/>
        </Fragment>
      )
    }];
  }



  render () {
    return (
      <EuiTabbedContent
        tabs={this.tabs}
        initialSelectedTab={this.tabs[0]}
        onTabClick={this.props.selectTab}
      />
    )
  }
}