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
import { displayRowsComponent } from './analyzer_form';

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
              renderTag: (index) => {
                return (
                  <EuiFieldText
                    name="analyzer"
                    fullWidth
                    className="analyzeApiFormWidthSize"
                    defaultValue={this.props.params.analyzer}
                    onChange={this.props.updateParamsWithEvent}/>
                );
              },
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