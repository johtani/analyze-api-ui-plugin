import { NavigationPublicPluginStart } from '../../../src/plugins/navigation/public';

export interface AnalyzeApiUiPluginSetup {}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AnalyzeApiUiPluginStart {}

export interface AppPluginStartDependencies {
  navigation: NavigationPublicPluginStart;
}
