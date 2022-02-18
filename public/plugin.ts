import { AppMountParameters, CoreSetup, CoreStart, Plugin } from '../../../src/core/public';
import {
  AnalyzeApiUiPluginSetup,
  AnalyzeApiUiPluginStart,
  AppPluginStartDependencies,
} from './types';
import { PLUGIN_NAME } from '../common';

export class AnalyzeApiUiPlugin
  implements Plugin<AnalyzeApiUiPluginSetup, AnalyzeApiUiPluginStart>
{
  public setup(core: CoreSetup): AnalyzeApiUiPluginSetup {
    // Register an application into the side navigation menu
    core.application.register({
      id: 'analyzeApiUi',
      title: PLUGIN_NAME,
      async mount(params: AppMountParameters) {
        // Load application bundle
        const { renderApp } = await import('./application');
        // Get start services as specified in kibana.json
        const [coreStart, depsStart] = await core.getStartServices();
        // Render the application
        return renderApp(coreStart, depsStart as AppPluginStartDependencies, params);
      },
    });
    return {};
  }

  public start(core: CoreStart): AnalyzeApiUiPluginStart {
    return {};
  }

  public stop() {}
}
