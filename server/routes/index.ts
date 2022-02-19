import { IRouter, Logger } from 'kibana/server';
import { schema } from '@kbn/config-schema';
import { convertEsError } from "./handle_es_error";

export function defineRoutes(router: IRouter, logger: logger) {
  router.post(
    {
      path: '/api/analyze_api_ui/analyze',
      validate: {
        body: schema.object({
          text: schema.string(),
          indexName: schema.maybe(schema.nullable(schema.string())),
          analyzer: schema.maybe(schema.nullable(schema.string())),
          tokenizer: schema.maybe(schema.oneOf([schema.nullable(schema.string()), schema.object({}, { unknowns: 'allow' })])),
          field: schema.maybe(schema.nullable(schema.string())),
          filters: schema.maybe(schema.arrayOf(schema.nullable(schema.oneOf([schema.string(), schema.object({}, { unknowns: 'allow' })])))),
          charfilters: schema.maybe(schema.arrayOf(schema.nullable(schema.oneOf([schema.string(), schema.object({}, { unknowns: 'allow' })]))))
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
        body: {
          resultAnalyzers: []
        }
      };

      function getAnalyzerResult(analyzer, id) {
        return new Promise(function (resolve, reject) {
          param.body.analyzer = analyzer;
          const results = context.core.elasticsearch.client.asCurrentUser.indices.analyze(param)
            results.then(
              (x) => {
                res.body.resultAnalyzers.push({analyzer: analyzer, id: id, tokens: x.body.tokens});
                resolve(res);
              }
            );
            results.catch(error => {
              reject(convertEsError(response, error));
            });
        });
      };

      if (Array.isArray(request.body.analyzers) && request.body.analyzers.length >= 1) {
        try {
          const res_promise = await Promise.all(request.body.analyzers.map(getAnalyzerResult));
          res.body.resultAnalyzers.sort(
            function (a, b) {
              if (a.id < b.id) return -1;
              if (a.id > b.id) return 1;
              return 0;
            }
          );
          return response.ok(res);
        } catch (error) {
          return convertEsError(response, error);
        }
      } else {
        return response.ok(res);
      }
    }
  );
}
