import React, {
  Component
} from 'react';

import {displayRowsComponent} from "./tokenizer_and_filters";

class TokenizerComponent extends Component {
  constructor(props) {
    super(props);
  }


  render () {
    const {
      analyzer,
      tokenizer,
      tokenIndices
    } = this.props;

    const target = analyzer? analyzer : tokenizer;
    const name = analyzer? "analyzer" : "tokenizer";
    return this.renderRow(target, name, tokenIndices);
  }
}
const Tokenizer = displayRowsComponent(TokenizerComponent);
export { Tokenizer };
