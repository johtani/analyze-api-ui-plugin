import React, {
  Component
} from 'react';
import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiButton,
  EuiSwitch,
} from '@elastic/eui'

export class FormControl extends Component {

  constructor(props) {
    super(props);
  }

  render () {
    return (
      <EuiFlexGroup gutterSize="m" alignItems="center">
        <EuiFlexItem grow={false}>
          <EuiButton
            name="performAnalyze"
            size="s"
            fill={true}
            type="submit"
            onClick={this.props.displayResult}
          >
            Analyze!
          </EuiButton>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiSwitch
            name="showAllTokenAttr"
            label="Show all Token Attrs?"
            checked={this.props.params.showAllTokenAttr}
            onChange={this.props.updateParamsWithEvent}
          />
        </EuiFlexItem>
      </EuiFlexGroup>
    );
  }

}