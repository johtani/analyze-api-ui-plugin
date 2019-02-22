import React, {
  Component
} from 'react';

import {
  EuiTable,
  EuiTableBody,
  EuiTableHeader,
  EuiTableHeaderCell,
  EuiTableRow,
  EuiTableRowCell,
} from '@elastic/eui';
import {Tokenizer} from "./tokenizer";
import {Filters} from "./filters";

export class TokenizerAndFilters extends Component {
  constructor(props) {
    super(props);
  }

  renderHeaderTokensCells(tokenIndices) {
    const headerCells = tokenIndices.map(
      (index) =>
        <EuiTableHeaderCell
          scope="col"
          style={{width: 150}}
        >
          <span class="euiTableCellContent__text analyzeApiTableCell analyzeApiTableTokenCell">type<br/><span
            class="analyzeApiFontBold">tokens[{index}]</span></span>
        </EuiTableHeaderCell>
    );
    return headerCells;
  }

  render() {
    const {tokenizer} = this.props;
    const {analyzer} = this.props;
    const {filters} = this.props;
    const {tokenIndices} = this.props;
    const {showAllTokenAttr} = this.props;
    if (tokenizer || analyzer || filters) {
      return (
        <div className="analyzeApiTableScroll">
          <EuiTable className="analyzeApiTableLayout">
            <EuiTableHeader>
              <EuiTableHeaderCell
                scope="col"
                style={{ width:150 }}
                >
                <span class="euiTableCellContent__text analyzeApiTableCell">type<br/><span class="analyzeApiFontBold">name</span></span>
              </EuiTableHeaderCell>
              {this.renderHeaderTokensCells(tokenIndices)}
            </EuiTableHeader>
            <EuiTableBody>
              <Tokenizer
                tokenizer={tokenizer}
                analyzer={analyzer}
                tokenIndices={tokenIndices}
                showAllTokenAttr={showAllTokenAttr}
              />
              <Filters
                filters={filters}
                tokenIndices={tokenIndices}
                showAllTokenAttr={showAllTokenAttr}
              />
            </EuiTableBody>
          </EuiTable>
        </div>
      );
    }
  }
}