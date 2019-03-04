import React, {
  Component
} from 'react';
import {
  EuiButtonIcon,
  EuiFieldText,
  EuiFormRow,
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
                  <EuiFormRow
                    isInvalid={this.state.isError}
                    error={this.state.error}
                  >
                    <EuiFieldText
                      name="analyzer"
                      fullWidth
                      className="analyzeApiFormWidthSize"
                      isInvalid={this.state.isError}
                      defaultValue={this.props.params.analyzer}
                      onChange={this.props.updateParamsWithEvent}/>
                  </EuiFormRow>
                );
              },
              style: { width: 300 },
            }
          }
        ]
      },
      isError : false
    }
  }
  hoge(){
    console.log("hogehogehoge");
  }

  setError(isError, error) {
    console.log("setError["+error+"]");
    this.setState(
      {
        error: error,
        isError: isError
      }
    );
    console.log(this.state);
  }

  render () {
    console.log("simple render");
    console.log(this.state);
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