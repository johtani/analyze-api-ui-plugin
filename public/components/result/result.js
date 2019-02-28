import React, {
  Component
} from 'react';
import {AnalyzerResult} from "./analyzer_result";
import {CompareResult} from "./compare_result";
import {RESULT_TYPE} from "../../common/constants/tab_names";

export class Result extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {type} = this.props;
    const {detail} = this.props;
    const {esRequest} = this.props;
    const {indexName} = this.props;
    const {showAllTokenAttr} = this.props;
    if (type === RESULT_TYPE.SINGLE) {
      return (
        <AnalyzerResult
          detail={detail}
          esRequest={esRequest}
          indexName={indexName}
          showAllTokenAttr={showAllTokenAttr}
        />
      );
    } else {
      return (
        <CompareResult
          detail={detail}
        />
      );
    }
  }
}