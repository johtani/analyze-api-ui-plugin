import analyzeRoute from './server/routes/analyze';

export default function (kibana) {
  return new kibana.Plugin({
    require: ['elasticsearch'],
    name: 'analyze_api_ui',
    uiExports: {
      app: {
        title: 'Analyze UI',
        description: 'UI for elasticsearch analyze API',
        main: 'plugins/analyze_api_ui/app'
      },
      styleSheetPaths: require('path').resolve(__dirname, 'public/app.scss'),
    },

    config(Joi) {
      return Joi.object({
        enabled: Joi.boolean().default(true),
      }).default();
    },
    init(server) {
      // Add server routes and initalize the plugin here
      analyzeRoute(server);
    }
  });
};
