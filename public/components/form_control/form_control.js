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
    this.state = {
      showAllTokenAttr: false
    };
  }

  validateForm() {
    console.log("validation is not Implemented!!");
  }

  callApi () {


  }

  onChange = e => {
    this.setState({
        showAllTokenAttr: e.target.checked,
    });
  }

  onClick = e => {
    console.log("Click Click!!")
    this.validateForm();
    console.log(this.state);
    // if validation is fine, we call API
  }

  render () {
    return (
      <EuiFlexGroup gutterSize="m" alignItems="center">
        <EuiFlexItem grow={false}>
          <EuiButton
            size="s"
            fill={true}
            onClick={this.onClick}
          >
            Analyze!
          </EuiButton>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiSwitch
            label="Show all Token Attrs?"
            checked={this.state.showAllTokenAttr}
            onChange={this.onChange}
          />
        </EuiFlexItem>
      </EuiFlexGroup>
    );
  }

}