import React, {
  Component
} from 'react';
import {
  EuiButtonIcon,
  EuiFieldText,
  EuiTable,
  EuiTableBody,
  EuiTableRow,
  EuiTableRowCell,
  EuiToolTip
} from '@elastic/eui';

import displayRowsComponent from './abstract';

class SimpleAnalyzerComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rows: {
        "analyzer": [
          {
            label: {
              style: { width: 100},
            },
            form: {
              value: <EuiFieldText name="analyzer" fullWidth />,
              style: { width: 300 },
            }
          }
        ]
      }
    }
  }

  render () {
    return (
      <EuiTable>
        <EuiTableBody>
          {this.renderRow("analyzer", this.state.rows.analyzer)}
        </EuiTableBody>
      </EuiTable>
    )
  }
}
const SimpleAnalyzer = displayRowsComponent(SimpleAnalyzerComponent);
export { SimpleAnalyzer };