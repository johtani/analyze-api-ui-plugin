import React, {
  Component
} from 'react';
import {
  EuiTable,
  EuiTableBody,
  EuiTableHeader,
  EuiTableHeaderCell,
  EuiTableRow,
  EuiTableRowCell
} from '@elastic/eui';

export class Charfilters extends Component {

  constructor(props) {
    super(props);
  }

  renderRow(target) {
    return (
      <EuiTableRow>
        <EuiTableRowCell>
          <span>char_filter<br/>
            <span className="analyzeApiFontBold">{target.name}</span>
          </span>
        </EuiTableRowCell>
        <EuiTableRowCell>
          <span>{target.filtered_text[0]}</span>
        </EuiTableRowCell>
      </EuiTableRow>
    );
  }

  renderRows(charfilters) {
    if (charfilters && charfilters.length > 0) {
      const rows = charfilters.map((target) => {
        return this.renderRow(target);
      });
      return rows;
    } else {
      return null;
    }
  }

  render() {
    const {charfilters} = this.props;
    if (charfilters && charfilters.length > 0) {
      return (
        <div class="analyzeApiTableScroll">
          <EuiTable className="analyzeApiTableLayout">
            <EuiTableHeader>
              <EuiTableHeaderCell
                scope="col"
                style={{ width:150 }}
              >
                type<br/><span class="analyzeApiFontBold">name</span>
              </EuiTableHeaderCell>
              <EuiTableHeaderCell
                scope="col"
              >
                filtered text
              </EuiTableHeaderCell>
            </EuiTableHeader>
            <EuiTableBody>
              {this.renderRows(charfilters)}
            </EuiTableBody>
          </EuiTable>
        </div>
      );
    } else {
      return null;
    }
  }
}