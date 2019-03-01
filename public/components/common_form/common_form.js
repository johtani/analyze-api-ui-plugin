import React, {
  Component
} from 'react';
import {
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
  }

  render () {
    const {params} = this.props;
    const {errors} = this.props;
    const showIndexNameError = Object.keys(errors).includes("indexNameError");
    const indexNameError = showIndexNameError ? errors.indexNameError : undefined;
    const showTextError = Object.keys(errors).includes("textError");
    const textError = showTextError ? errors.textError : undefined;

    return (
      <EuiFlexGroup gutterSize="m" alignItems="center">
        <EuiFlexItem grow={false} style={{ minWidth: 600 }}>
          <EuiFormRow
            name="indexName"
            label={
              <span>
                Index name <EuiTextColor color="subdued"> - select index name if you use the analyzer to configure an index</EuiTextColor>
              </span>
            }
            fullWidth
            isInvalid={showIndexNameError}
            error={indexNameError}
            onChange={this.props.updateParamsWithEvent}
          >
            <EuiFieldText
              name="indexName"
              fullWidth={true}
              isInvalid={showIndexNameError}
              value={params.indexName}
            />
          </EuiFormRow>
          <EuiFormRow
            name="text"
            label={
              <span>
                Text<EuiTextColor color="subdued"> - Text what you want to analyze</EuiTextColor>
              </span>
            }
            fullWidth
            isInvalid={showTextError}
            error={textError}
            onChange={this.props.updateParamsWithEvent}
          >
            <EuiFieldText
              name="text"
              isInvalid={showTextError}
              fullWidth={true}
              value={params.text}
            />
          </EuiFormRow>

        </EuiFlexItem>
      </EuiFlexGroup>
    );
  }
}