import React, {
  Component,
  Fragment
} from 'react';

import {
  EuiButtonIcon,
  EuiFieldText,
  EuiTabbedContent,
  EuiTable,
  EuiTableBody,
  EuiTableRow,
  EuiTableRowCell,
  EuiToolTip,
  EuiSpacer,
} from '@elastic/eui';

import { SimpleAnalyzer } from './simple';
import { CustomAnalyzer } from './custom';
import { FieldAnalyzer } from './field';
import { CompareAnalyzers } from './compare_analyzers';
import { TAB_NAME } from "../../common/constants/tab_names";

export class AnalyzerForm extends Component {

  constructor(props) {
    super(props);
    this.tabs = [{
      id: 'analyzer',
      name: TAB_NAME.ANALYZER,
      content: (
        <Fragment>
          <EuiSpacer/>
          <SimpleAnalyzer
            params={this.props.params}
            updateParamsWithEvent={this.props.updateParamsWithEvent}
          />
        </Fragment>
      )
    }, {
      id: 'custom_analyzer',
      name: TAB_NAME.CUSTOM_ANALYZER,
      content: (
        <Fragment>
          <EuiSpacer/>
          <CustomAnalyzer
            params={this.props.params}
            updateParamsWithEvent={this.props.updateParamsWithEvent}
            updateParamsWithEventAndIndex={this.props.updateParamsWithEventAndIndex}
          />
        </Fragment>
      )
    }, {
      id: 'field',
      name: TAB_NAME.FIELD,
      content: (
        <Fragment>
          <EuiSpacer/>
          <FieldAnalyzer
            params={this.props.params}
            updateParamsWithEvent={this.props.updateParamsWithEvent}
          />
        </Fragment>
      )
    }, {
      id: 'compare_analyzers',
      name: TAB_NAME.COMPARE_ANALYZERS,
      content: (
        <Fragment>
          <EuiSpacer/>
          <CompareAnalyzers
            params={this.props.params}
            updateParamsWithEvent={this.props.updateParamsWithEvent}
            updateParamsWithEventAndIndex={this.props.updateParamsWithEventAndIndex}
          />
        </Fragment>
      )
    }];
    this.props.selectTab(this.tabs[this.tabIndex()]);
  }

  tabIndex() {
    const {tab} = this.props.params;
    let tabIdx = 0;
    if (tab) {
      this.tabs.forEach((tmpTab, idx) => {
          if (tmpTab.name == tab) {
            tabIdx = idx;
          }
        }
      );
    }
    return tabIdx;
  }

  render () {
    return (
      <EuiTabbedContent
        tabs={this.tabs}
        initialSelectedTab={this.tabs[this.tabIndex()]}
        onTabClick={this.props.selectTab}
      />
    )
  }
}

export function displayRowsComponent(WrappedComponent) {
  return class extends WrappedComponent {

    appendRow(type, index) {
      super.appendRow(type, index);
    }

    removeRow(type, index) {
      super.removeRow(type, index);
    }

    renderAdjustButton (type, cell, index, length) {
      if (cell.button) {
        return (
          <EuiTableRowCell>
            {index == 0 ? (
              <EuiToolTip content={`Add ${type}`}>
                <EuiButtonIcon
                  iconType="plusInCircle"
                  aria-label={`Add ${type}`}
                  onClick={() => this.appendRow(type, index)}
                />
              </EuiToolTip>
            ) : null }
            {length > 1 ? (
              <EuiToolTip content={`Remove ${type}`}>
                <EuiButtonIcon
                  iconType="minusInCircle"
                  aria-label={`Add ${type}`}
                  onClick={() => this.removeRow(type, index)}
                />
              </EuiToolTip>
            ) : null }
          </EuiTableRowCell>
        );
      } else {
        return (
          <EuiTableRowCell/>
        );
      }
    }

    renderRow (type, cells) {
      return cells.map((cell, index) => {
        return (
          <EuiTableRow className="customRowClass" key={`${type}-row-${index}`}>
            <EuiTableRowCell className="customCellClass" style={cell.label.style}>
              {type}
            </EuiTableRowCell>
            <EuiTableRowCell className="customCellClass" style={cell.form.style}>
              {cell.form.renderTag(index)}
            </EuiTableRowCell>
            {this.renderAdjustButton(type, cell, index, cells.length)}
          </EuiTableRow>
        );
      });
    }

  }
}