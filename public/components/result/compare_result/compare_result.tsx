import React, {
  Component,
} from 'react';
import {
  EuiPanel,
  EuiTable,
  EuiTableHeader,
  EuiTableHeaderCell,
  EuiTableBody,
  EuiTableRow,
  EuiTableRowCell,
} from '@elastic/eui';
import {createTokenIndices, getLength} from "../../../services/token_utils";
import {Token} from "../analyzer_result/tokenizer_and_filters/token";


export class CompareResult extends Component {

  constructor(props) {
    super(props);
  }

  countTokenStreamLength(analyzerResults) {
    let tokenStreamLength = 0;
    analyzerResults.forEach((detail) => {
      tokenStreamLength = getLength(tokenStreamLength, detail.tokens);
    });
    return createTokenIndices(tokenStreamLength);
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

  renderTokenCells (tokenIndices, target) {
    const tokenCells = tokenIndices.map(
      (index) =>
        <EuiTableRowCell>
          <Token
            index={index}
            target={target}
            showAllTokenAttr={false}
          />
        </EuiTableRowCell>
    );
    return tokenCells;
  }

  renderRows(tokenIndices, detail) {
    const rows = detail.map(
      (result) =>
        <EuiTableRow
          className="analyzeApiTableRowTop"
        >
          <EuiTableRowCell>
          <span className="analyzeApiTableCell">analyzer<br/>
            <span className="analyzeApiFontBold">{result.analyzer}</span>
          </span>
          </EuiTableRowCell>
          {this.renderTokenCells(tokenIndices, result)}
        </EuiTableRow>
    );
    return rows;
  }

  render() {
    const {
      detail
    } = this.props;
    const tokenIndices = this.countTokenStreamLength(detail);

    return (
      <EuiPanel
        padding="s"
        className="analyzeApiTableScroll"
      >
        There are only tokens and positions. If you know analyzer details, use analyzer/custom_analyzer tab.
        <div class="analyzeApiTableScroll">
          <EuiTable className="analyzeApiTableLayout">
            <EuiTableHeader>
              <EuiTableHeaderCell
                scope="col"
                style={{ width:150 }}
              >
                <span className="euiTableCellContent__text analyzeApiTableCell">type<br/><span className="analyzeApiFontBold">name</span></span>
              </EuiTableHeaderCell>
              {this.renderHeaderTokensCells(tokenIndices)}
            </EuiTableHeader>
            <EuiTableBody>
              {this.renderRows(tokenIndices, detail)}
            </EuiTableBody>
          </EuiTable>
        </div>
      </EuiPanel>
    );
  }
}