import React, {
  Component
} from 'react';
import {
  EuiCallOut,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFormRow,
  EuiFieldText,
  EuiTextColor,
  Fragment,
} from '@elastic/eui';

export class CommonForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      errors: {
        indexNameError: "",
        textError: "",
      }
    };
  }

  renderFormErrors() {
    const { errors } = this.state.errors;
    if (!errors) {
      return;
    }
    return (
      <Fragment>
        <EuiCallOut
          iconType="alert"
          color="danger"
          title="Please check each input errors."
        />
      </Fragment>
    );
  }

  render () {
    return (
      <EuiFlexGroup gutterSize="m" alignItems="center">
        {this.renderFormErrors()}
        <EuiFlexItem grow={false} style={{ minWidth: 600 }}>
          <EuiFormRow
            label={
              <span>
                Index name <EuiTextColor color="subdued"> - select index name if you use the analyzer to configure an index</EuiTextColor>
              </span>
            }
            fullWidth
            isInvalid={this.state.indexNameError}
            error={this.state.indexNameError}
          >
            <EuiFieldText name="indexName" fullWidth={true}/>
          </EuiFormRow>
          <EuiFormRow
            label={
              <span>
                Text<EuiTextColor color="subdued"> - Text what you want to analyze</EuiTextColor>
              </span>
            }
            fullWidth
            isInvalid={this.state.textError}
            error={this.state.textError}
          >
            <EuiFieldText name="text" fullWidth={true}/>
          </EuiFormRow>

        </EuiFlexItem>
      </EuiFlexGroup>
    );
  }
}