import React, {
  Component
} from 'react';
import {
  EuiTable,
  EuiTableBody,
  EuiTableHeader,
  EuiTableHeaderCell,
} from '@elastic/eui';

export class Charfilters extends Component {

  constructor(props) {
    super(props);
  }

  renderHeaders() {
    const headers = [];

    return headers.length ? headers : null;
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

            </EuiTableBody>
          </EuiTable>
        </div>
      );
    } else {
      return null;
    }
  }
}