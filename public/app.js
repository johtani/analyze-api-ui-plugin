import { uiModules } from 'ui/modules';
import uiRoutes from 'ui/routes';

import 'ui/autoload/modules';
import 'ui/autoload/styles';
import './less/main.less';
import template from './templates/index.html';
import { analyzeApiUiPluginController } from './analyzeui_controller';

uiRoutes.enable();
uiRoutes
.when('/', {
  template: template,
  controller: 'analyzeApiUiPluginController as controller'
});

uiModules
.get('app/analyze-api-ui-plugin', [])
.controller('analyzeApiUiPluginController', analyzeApiUiPluginController);
