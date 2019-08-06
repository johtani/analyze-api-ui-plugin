import React, {
  Component,
} from 'react';
import {
  EuiFieldText,
  EuiTable,
  EuiTableBody,
  EuiTableRow,
  EuiTableRowCell,
  EuiSpacer,
  Fragment
} from '@elastic/eui';
import { displayRowsComponent } from './analyzer_form';

class CompareAnalyzersComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: {
        "analyzersForCompare": []
      }
    };
    //Need two boxes because of "Compare..."
    if (this.props.params.analyzersForCompare.length > 0) {
      for (let i=0;i < this.props.params.analyzersForCompare.length; i++) {
        this.appendAnalyzer();
      }
    } else {
      this.appendAnalyzer();
      this.appendAnalyzer();
    }
  }

  appendAnalyzer(type, index) {
    this.state.rows.analyzersForCompare.push(
      {
        type: "analyzersForCompare",
        label: {
          value: "analyzer",
          style: {width: 100},
        },
        form: {
          renderTag: (index) => {
            return (
              <EuiFieldText
                name="analyzersForCompare"
                fullWidth
                data-index={index}
                defaultValue={this.props.params.analyzersForCompare[index]}
                onChange={this.props.updateParamsWithEventAndIndex}/>
            );
          },
          style: {width: 300},
        },
        button: true
      }
    );
    this.setState({rows: this.state.rows});
  }

  appendRow(type, index) {
    this.appendAnalyzer();
  }

  removeRow(type, index) {
    this.state.rows.analyzersForCompare.splice(index, 1);
    this.props.updateParamsWithRemoveRow("analyzersForCompare", index);
    this.setState({rows: this.state.rows});
  }

  render() {
    return (
      <EuiTable>
        <EuiTableBody>
          {this.renderRow("analyzer", this.state.rows.analyzersForCompare)}
        </EuiTableBody>
      </EuiTable>
    )
  }
}
const CompareAnalyzers = displayRowsComponent(CompareAnalyzersComponent);
export { CompareAnalyzers };