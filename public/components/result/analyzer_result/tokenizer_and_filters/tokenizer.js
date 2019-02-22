import React, {
  Component
} from 'react';

import {
  EuiTableRow,
  EuiTableRowCell,
} from '@elastic/eui'
import {Token} from "./token";

export class Tokenizer extends Component {
  constructor(props) {
    super(props);
  }

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

  render () {
    const {
      analyzer,
      tokenizer,
      tokenIndices
    } = this.props;

    const target = analyzer? analyzer : tokenizer;
    const name = analyzer? "analyzer" : "tokenizer";

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