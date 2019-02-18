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
          <SimpleAnalyzer/>
        </Fragment>
      )
    }, {
      id: 'custom_analyzer',
      name: 'Custom Analyzer',
      content: (
        <Fragment>
          <EuiSpacer/>
          <CustomAnalyzer/>
        </Fragment>
      )
    }, {
      id: 'field',
      name: 'Field',
      content: (
        <Fragment>
          <EuiSpacer/>
          <FieldAnalyzer/>
        </Fragment>
      )
    }, {
      id: 'compare_analyzers',
      name: 'Compare Analyzers',
      content: (
        <Fragment>
          <EuiSpacer/>
          <CompareAnalyzers/>
        </Fragment>
      )
    }];
  }

  render () {
    return (
      <EuiTabbedContent
        tabs={this.tabs}
        initialSelectedTab={this.tabs[0]}
      />
    )
  }
}