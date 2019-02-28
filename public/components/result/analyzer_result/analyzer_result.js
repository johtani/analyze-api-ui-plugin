import React, {
  Component,
} from 'react';
import {
  EuiCodeBlock,
  EuiPanel,
  EuiSpacer,
  EuiTable,
  EuiTableHeader,
} from '@elastic/eui';
import {Charfilters} from "./charfilters";
import {TokenizerAndFilters} from "./tokenizer_and_filters";
import {createTokenIndices, getLength} from "../../../services/token_utils";

export class AnalyzerResult extends Component {

  constructor(props) {
    super(props);
  }

  countTokenSteamLength(detail) {
    // FIXME tokens length is not fit if it has synonym token/compound token...
    let tokenStreamLength = 0;

    if (detail.tokenizer) {
      tokenStreamLength = getLength(tokenStreamLength, detail.tokenizer.tokens);
    } else if (detail.analyzer) {
      tokenStreamLength = getLength(tokenStreamLength, detail.analyzer.tokens);
    }
    if (detail.tokenfilters) {
      detail.tokenfilters.forEach( (filter) => {
        tokenStreamLength = getLength(tokenStreamLength, filter.tokens);
      });
    }
    return createTokenIndices(tokenStreamLength);
  }

  render() {
    const {
      detail,
      esRequest,
      indexName
    } = this.props;
    const tokenIndices = this.countTokenSteamLength(detail);
    return (
      <EuiPanel paddingSize="m">
        <EuiSpacer size="m"/>
        <EuiPanel paddingSize="s">
          <Charfilters charfilters={detail.charfilters}/>
          <TokenizerAndFilters
            tokenizer={detail.tokenizer}
            analyzer={detail.analyzer}
            filters={detail.tokenfilters}
            tokenIndices={tokenIndices}
            showAllTokenAttr={this.props.showAllTokenAttr}
          />
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