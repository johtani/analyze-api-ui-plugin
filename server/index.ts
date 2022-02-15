import { PluginInitializerContext } from '../../../src/core/server';
import { AnalyzeApiUiPlugin } from './plugin';

//  This exports static code and TypeScript types,
//  as well as, Kibana Platform `plugin()` initializer.

export function plugin(initializerContext: PluginInitializerContext) {
  return new AnalyzeApiUiPlugin(initializerContext);
}

export { AnalyzeApiUiPluginSetup, AnalyzeApiUiPluginStart } from './types';
