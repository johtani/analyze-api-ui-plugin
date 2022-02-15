import { IRouter } from '../../../../src/core/server';
import { schema } from '@kbn/config-schema';
import { convertEsError } from "./handle_es_error";

export function defineRoutes(router: IRouter) {
  router.post(
    {
      path: '/api/analyze_api_ui/analyze',
      validate: {
        body: schema.object({
          text: schema.string(),
          indexName: schema.maybe(schema.nullable(schema.string())),
          analyzer: schema.maybe(schema.nullable(schema.string())),
          tokenizer: schema.maybe(schema.oneOf([schema.nullable(schema.string()), schema.object({})])),
          field: schema.maybe(schema.nullable(schema.string())),
          filters: schema.maybe(schema.arrayOf(schema.nullable(schema.oneOf([schema.string(), schema.object({})])))),
          charfilters: schema.maybe(schema.arrayOf(schema.nullable(schema.oneOf([schema.string(), schema.object({})]))))
        })
      }
    },
    async (context, request, response) => {
      let param = {
        body: {
          explain: true,
          text: request.body.text
        }
      };
      if (request.body.indexName) param.index = request.body.indexName;
      if (request.body.analyzer) param.body.analyzer = request.body.analyzer;
      if (request.body.tokenizer) param.body.tokenizer = request.body.tokenizer;
      if (request.body.charfilters) param.body.char_filter = request.body.charfilters;
      if (request.body.field) param.body.field = request.body.field;
      if (request.body.filters) param.body.filter = request.body.filters;
      try {
        const results = await context.core.elasticsearch.client.asCurrentUser.indices.analyze(param);
        return response.ok({
          body: {
            detail: results.body.detail,
            request: param.body
          }
        });
      } catch (error) {
        return convertEsError(response, error);
      }
    }
  );

  router.post(
    {
      path: '/api/analyze_api_ui/multi_analyze',
      validate: {
        body: schema.object({
          text: schema.string(),
          indexName: schema.maybe(schema.nullable(schema.string())),
          analyzers: schema.nullable(schema.arrayOf(schema.string(), {minSize: 2}))
        })
      }
    },
    async (context, request, response) => {
      let param = {
        body: {
          explain: false,
          text: request.body.text
        }
      };
      if (request.body.indexName) param.index = request.body.indexName;
      const res = {
        resultAnalyzers: []
      };

      function getAnalyzerResult(analyzer, id) {
        return new Promise(function (resolve, reject) {
          param.body.analyzer = analyzer;
          context.core.elasticsearch.client.asCurrentUser.indices.analyze(param)
            .then(function (response) {
              res.resultAnalyzers.push({analyzer: analyzer, id: id, tokens: response.tokens});
              resolve(res);
            })
            .catch(error => {
              reject(convertEsError(response, error));
            });
        });
      };

      if (Array.isArray(request.body.analyzers) && request.body.analyzers.length >= 1) {
        try {
          const response = await Promise.all(request.body.analyzers.map(getAnalyzerResult));
          res.resultAnalyzers.sort(
            function (a, b) {
              if (a.id < b.id) return -1;
              if (a.id > b.id) return 1;
              return 0;
            }
          );
          return res;
        } catch (error) {
          return convertEsError(response, error);
        }
      } else {
        return res;
      }
    }
  );
}
