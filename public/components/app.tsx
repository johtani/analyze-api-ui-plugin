import React from 'react';
import { I18nProvider } from '@kbn/i18n/react';
import { BrowserRouter as Router } from 'react-router-dom';

import {
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiSpacer,
  EuiTitle,
} from '@elastic/eui';

import { CoreStart } from '../../../../src/core/public';
import { NavigationPublicPluginStart } from '../../../../src/plugins/navigation/public';

import {AnalyzeUi} from "./analyze_ui";

import { PLUGIN_ID } from '../../common';

interface AnalyzeApiUiAppDeps {
  basename: string;
  notifications: CoreStart['notifications'];
  http: CoreStart['http'];
  navigation: NavigationPublicPluginStart;
}

export const AnalyzeApiUiApp = ({
  basename,
  http,
  navigation,
}: AnalyzeApiUiAppDeps) => {
  // Render the application DOM.
  // Note that `navigation.ui.TopNavMenu` is a stateful component exported on the `navigation` plugin's start contract.
  return (
    <Router basename={basename}>
      <I18nProvider>
        <>
          <navigation.ui.TopNavMenu
            appName={PLUGIN_ID}
            showSearchBar={false}
            useDefaultBehaviors={true}
          />
          <EuiPage restrictWidth={false} className="analyzeApiEUIPage NoMaxWidth">
            <EuiPageBody>
              <EuiPageHeader>
                <EuiPageHeaderSection>
                  <EuiTitle size="m">
                    <h2>Perform analyze via _analyze API</h2>
                  </EuiTitle>
                </EuiPageHeaderSection>
              </EuiPageHeader>
              <EuiPageContent panelPaddingSize="s">
                <AnalyzeUi httpClient={http}/>
                <EuiSpacer size="m"/>
              </EuiPageContent>
            </EuiPageBody>
          </EuiPage>
        </>
      </I18nProvider>
    </Router>
  );
};
