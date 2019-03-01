import React, {
  Component
} from 'react';

import {
  EuiTable,
  EuiTableBody,
  EuiTableRow,
  EuiTableRowCell,

} from '@elastic/eui'
import { DISP_TOKEN_PROPS } from '../../../../common/constants/token_properties';


export class Token extends Component {

  constructor(props) {
    super(props);
  }

  makeTokenListFromTokenStream(index, target) {
    const currentLevelTokenList = [];
    for (let token of target.tokens) {
      if (token.position > index) {
        break;
      }
      if (token.position == index) {
        currentLevelTokenList.push(token);
      }
    }
    return currentLevelTokenList;
  }

  hideTokenProperty(propertyName) {
    if (DISP_TOKEN_PROPS.alwaysShowTokenProperties.includes(propertyName)) {
      return true;
    } else {
      // TODO should we handle each attribute to show/hide?
      return this.props.showAllTokenAttr;
    }
  };

  // filter token properties
  filteredCurrentTokenInfo(token) {
    if (token != null) {
      const result = {};
      Object.keys(token).forEach((key) => {
        if (!DISP_TOKEN_PROPS.hiddenTokenProperties.includes(key)) {
          result[key] = token[key];
        }
      });
      return result;
    } else {
      return null;
    }
  }

  renderTokenValue(key, value) {
    if (key=='token') {
      return (
        <span class="analyzeApiFontBold">{value}</span>
      );
    } else {
      return (
        <span>{value}</span>
      );
    }
  }

  renderTokenKey(key) {
    if (this.props.index == 0) {
      return (
        <td>
          {key}
        </td>
      );
    } else {
      return null;
    }
  }

  renderRow(key, value) {
    if (this.hideTokenProperty(key)) {
      return (
        <tr>
          {this.renderTokenKey(key)}
          <td class="analyzeApiTextAlignRight">
            {this.renderTokenValue(key, value)}
            &nbsp;
          </td>
        </tr>
      );
    } else {
      return null;
    }
  }

  renderTokenProperties(token) {
    const currentTokenInfo = this.filteredCurrentTokenInfo(token);
    if (currentTokenInfo) {
      const propRows = [];
      Object.keys(token).forEach(
        (key) => {
          propRows.push(this.renderRow(key, token[key]));
        }
      );
      return propRows;
    } else {
      return null;
    }
  }

  renderTokenTable(currentLevelTokenList) {
    const tokenTables = currentLevelTokenList.map(
      (token) =>
        <table class="table table-condensed">
          <tbody>
            {this.renderTokenProperties(token)}
          </tbody>
        </table>
    );
    if (tokenTables.length > 0) {
      return tokenTables;
    } else {
      return (
        <span class="analyzeApiEmptyToken">no token</span>
      );
    }
  }

  render () {
    const {
      index,
      target,
    } = this.props;
    const currentLevelTokenList = this.makeTokenListFromTokenStream(index, target);
    if (currentLevelTokenList.length > 0){
      return (
        <div
          className="euiTableCellContent customCellClass analyzeApiTableRowTokenCell"
        >
          {this.renderTokenTable(currentLevelTokenList)}
        </div>
      );
    } else {
      return null;
    }
  }
}