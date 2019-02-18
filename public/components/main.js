import React, {
  Component
} from 'react';
import {
  EuiPage,
  EuiPageHeader,
  EuiTitle,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentHeader,
  EuiPageContentBody,
  EuiPageHeaderSection,
  EuiText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
} from '@elastic/eui';

import { CommonForm } from './common_form';
import { AnalyzerForm } from './analyzer_form';
import { FormControl } from "./form_control";

export class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <EuiPage restrictWidth={false} className="analyzeApiEUIPage NoMaxWidth">
        <EuiPageBody restrictWidth={false}>
          <EuiPageHeader>
            <EuiPageHeaderSection>
              <EuiTitle size="m">
                <h2>Perform analyze via _analyze API</h2>
              </EuiTitle>
            </EuiPageHeaderSection>
          </EuiPageHeader>
          <EuiPageContent panelPaddingSize="s">
            <CommonForm />
            <EuiSpacer size="m"/>
            <AnalyzerForm/>
            <EuiSpacer size="m"/>
            <FormControl/>

            <EuiSpacer size="m"/>
            <EuiPageContentBody>
              <EuiText>
                <h3>NOT IMPLEMENTED!!!!</h3>
              </EuiText>
            </EuiPageContentBody>

          </EuiPageContent>
        </EuiPageBody>
      </EuiPage>
    );
  }
}


