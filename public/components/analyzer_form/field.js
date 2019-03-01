import React, {
  Component
} from 'react';
import {
  EuiFieldText,
  EuiTable,
  EuiTableBody
} from '@elastic/eui';
import { displayRowsComponent } from './analyzer_form';

class FieldAnalyzerComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rows: {
        "field": [{
          type: "field",
          label: {
            value: "field",
            style: {width: 100},
          },
          form: {
            renderTag: (index) => {
              return (
                <EuiFieldText
                  name="field"
                  fullWidth
                  className="analyzeApiFormWidthSize"
                  defaultValue={this.props.params.field}
                  onChange={this.props.updateParamsWithEvent}
                />
                );
              },
            style: {width: 300},
          }
        }]
      }
    }
  }

  render () {
    return (
      <EuiTable>
        <EuiTableBody>
          {this.renderRow("field", this.state.rows.field)}
        </EuiTableBody>
      </EuiTable>
    )
  }
}
const FieldAnalyzer = displayRowsComponent(FieldAnalyzerComponent);
export { FieldAnalyzer };