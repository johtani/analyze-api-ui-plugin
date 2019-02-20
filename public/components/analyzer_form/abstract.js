import React from 'react';
import {
  EuiButtonIcon,
  EuiFieldText,
  EuiTable,
  EuiTableBody,
  EuiTableRow,
  EuiTableRowCell,
  EuiToolTip
} from '@elastic/eui';

function displayRowsComponent(WrappedComponent) {
  return class extends WrappedComponent {

    appendValueToFormRow() {

    }

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
        return;
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
export default displayRowsComponent;