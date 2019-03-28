import React, {
  Component
} from 'react';

import {displayRowsComponent} from "./tokenizer_and_filters";

class FiltersComponent extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    const {
      filters,
      tokenIndices
    } = this.props;
    if (filters && filters.length > 0) {
      const rows = filters.map((target) => {
          return this.renderRow(target, "filter", tokenIndices);
        }
      );
      return rows;
    } else {
      return null;
    }
  }
}
const Filters = displayRowsComponent(FiltersComponent);
export { Filters };
