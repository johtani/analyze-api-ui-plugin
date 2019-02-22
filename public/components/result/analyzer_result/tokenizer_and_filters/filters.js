import React, {
  Component
} from 'react';

import {
  EuiTableRow,

} from '@elastic/eui'

export class Filters extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    const {tokenfilters} = this.props;
    return (
      <EuiTableRow
        className="analyzeApiTableRowTop"
      >

      </EuiTableRow>
    );
  }
}