import React, {
  Component
} from 'react';
import {
  EuiTextArea,
  EuiTable,
  EuiTableBody
} from '@elastic/eui';
import displayRowsComponent from './abstract';

class CustomAnalyzerComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rows: {
        "char_filter": [],
        "tokenizer": [
          {
            type: "tokenizer",
            label: {
              value: "tokenizer",
              style: {width: 100},
            },
            form: {
              value: <EuiTextArea name="tokenizer"/>,
              style: {width: 300},
            }
          }
        ],
        "filter": []
      }
    }
    // initialize charfilter and filter
    this.appendCharFilter();
    this.appendFilter()
  }

  appendCharFilter() {
    this.state.rows.char_filter.push(
      {
        type: "char_filter",
        label: {
          value: "char_filter",
          style: {width: 100},
        },
        form: {
          value: <EuiTextArea name="char_filter"/>,
          style: {width: 300},
        },
        button: true
      }
    );
    this.setState(
      {
        rows: this.state.rows
      }
    );
  }

  appendFilter() {
    this.state.rows.filter.push(
      {
        type: "filter",
        label: {
          value: "filter",
          style: {width: 100},
        },
        form: {
          value: <EuiTextArea name="filter"/>,
          style: {width: 300},
        },
        button: true
      }
    );
    this.setState(
      {
        rows: {
          "filter": this.state.filter
        }
      }
    );
  }

  appendRow(type, index) {
    if (type == "char_filter") {
      this.appendCharFilter();
    } else if (type == "filter") {
      this.appendFilter();
    }
    console.log(this.state);
  }

  removeRow(type, index) {
    if (type == "char_filter") {
      this.state.rows.char_filter.splice(index, 1);
      this.setState({rows: this.state.rows});
    } else if (type == "filter") {
      this.state.rows.filter.splice(index, 1);
      this.setState({rows: this.state.rows});
    }
  }

  render () {
    return (
      <EuiTable>
        <EuiTableBody>
          {this.renderRow("char_filter", this.state.rows.char_filter)}
          {this.renderRow("tokenizer", this.state.rows.tokenizer)}
          {this.renderRow("filter", this.state.rows.filter)}
        </EuiTableBody>
      </EuiTable>
    )
  }
}
const CustomAnalyzer = displayRowsComponent(CustomAnalyzerComponent);
export { CustomAnalyzer };