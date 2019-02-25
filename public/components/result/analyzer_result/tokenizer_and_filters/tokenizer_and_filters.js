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
import {Token} from "./token";

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

export function displayRowsComponent(WrappedComponent) {
  return class extends WrappedComponent {

    shortenName(name) {
      if (name.indexOf('.') > 0) {
        return name.substr(name.lastIndexOf('.')+1);
      }
      return name;
    }

    renderTokenCells (tokenIndices, target) {
      const tokenCells = tokenIndices.map(
        (index) =>
          <EuiTableRowCell>
            <Token
              index={index}
              target={target}
              showAllTokenAttr={this.props.showAllTokenAttr}
            />
          </EuiTableRowCell>
      );
      return tokenCells;
    }

    renderRow(target, name, tokenIndices) {
      return (
        <EuiTableRow
          className="analyzeApiTableRowTop"
        >
          <EuiTableRowCell>
          <span className="analyzeApiTableCell">{name}<br/>
            <span className="analyzeApiFontBold">{this.shortenName(target.name)}</span>
          </span>
          </EuiTableRowCell>
          {this.renderTokenCells(tokenIndices, target)}
        </EuiTableRow>
      );
    }
  }
}