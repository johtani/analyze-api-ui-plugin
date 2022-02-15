import {
  PluginInitializerContext,
  CoreSetup,
  CoreStart,
  Plugin,
  Logger,
} from '../../../src/core/server';

import { AnalyzeApiUiPluginSetup, AnalyzeApiUiPluginStart } from './types';
import { defineRoutes } from './routes';

export class AnalyzeApiUiPlugin
  implements Plugin<AnalyzeApiUiPluginSetup, AnalyzeApiUiPluginStart>
{
  private readonly logger: Logger;

  constructor(initializerContext: PluginInitializerContext) {
    this.logger = initializerContext.logger.get();
  }

  public setup(core: CoreSetup) {
    this.logger.debug('analyze-api-ui-plugin: Setup');
    const router = core.http.createRouter();

    // Register server side APIs
    defineRoutes(router);

    return {};
  }

  public start(core: CoreStart) {
    this.logger.debug('analyze-api-ui-plugin: Started');
    return {};
  }

  public stop() {}
}
