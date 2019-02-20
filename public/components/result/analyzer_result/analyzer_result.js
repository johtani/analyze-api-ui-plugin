import React, {
  Component,
} from 'react';
import {
  EuiCodeBlock,
  EuiPanel,
  EuiSpacer,
} from '@elastic/eui';


export class AnalyzerResult extends Component {
  render() {
    const {
      detail,
      esRequest,
      indexName,
    } = this.props;
    console.log("detail---");
    console.log(detail);
    console.log("detail---");
    return (
      <EuiPanel paddingSize="m">
        <EuiSpacer size="m"/>
        <EuiPanel>
        </EuiPanel>
        <EuiSpacer size="s"/>
        <EuiPanel paddingSize="s">
          <span>Request for Elasticsearch - you can copy and paste to Console</span>
          <EuiCodeBlock fontSize="s" paddingSize="s" className="analyzeRequest">
            GET {indexName}/_analyze
            {JSON.stringify(esRequest, null, 2)}
          </EuiCodeBlock>
        </EuiPanel>
      </EuiPanel>
    );
  }
}