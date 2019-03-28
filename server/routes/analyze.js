import Joi from 'joi';
import { convertEsError } from './handle_es_error';

export default function (server) {

  let call = server.plugins.elasticsearch.getCluster('data').callWithRequest;

  server.route({
    path: '/api/analyze_api_ui/analyze',
    method: 'POST',
    options: {
      validate: {
        payload: Joi.object().keys({
          text: Joi.string().required(),
          indexName: Joi.string().allow(null).optional(),
          analyzer: Joi.string().allow(null).optional(),
          tokenizer: [Joi.string().allow(null).optional(), Joi.object().optional()],
          field: Joi.string().allow(null).optional(),
          filters: Joi.array().allow(null).items(Joi.string(), Joi.object()).optional(),
          charfilters: Joi.array().allow(null).items(Joi.string(), Joi.object()).optional()
        }).required()
      }
    },
    handler: async (req) => {

      // get params from req
      // call _analyze api
      let param = {
        body: {
          explain: true,
          text: req.payload.text
        }
      };
      if (req.payload.indexName) param.index = req.payload.indexName;
      if (req.payload.analyzer) param.body.analyzer = req.payload.analyzer;
      if (req.payload.tokenizer) param.body.tokenizer = req.payload.tokenizer;
      if (req.payload.charfilters) param.body.char_filter = req.payload.charfilters;
      if (req.payload.field) param.body.field = req.payload.field;
      if (req.payload.filters) param.body.filter = req.payload.filters;
      try {
        const response = await call(req, 'indices.analyze', param);
        return {
          detail: response.detail,
          request: param.body
        };
      } catch (error) {
        return convertEsError(param.index, error);
      }
    }
  });

  server.route({
    path: '/api/analyze_api_ui/multi_analyze',
    method: 'POST',
    options: {
      validate: {
        payload: Joi.object().keys({
          text: Joi.string().required(),
          indexName: Joi.string().allow(null).optional(),
          analyzers: Joi.array().allow(null).items(Joi.string()).min(2)
        }).required()
      }
    },
    handler: async (req, h) => {
      // get params from req
      // call _analyze api
      let param = {
        body: {
          explain: false,
          text: req.payload.text
        }
      };
      if (req.payload.indexName) param.index = req.payload.indexName;
      const res = {
        resultAnalyzers: []
      };

      function getAnalyzerResult(analyzer, id) {
        return new Promise(function (resolve, reject) {
          param.body.analyzer = analyzer;
          call(req, 'indices.analyze', param)
            .then(function (response) {
              res.resultAnalyzers.push({analyzer: analyzer, id: id, tokens: response.tokens});
              resolve(res);
            })
            .catch(error => {
              reject(convertEsError(param.index, error));
            });
        });
      };

      if (Array.isArray(req.payload.analyzers) && req.payload.analyzers.length >= 1) {
        try {
          const response = await Promise.all(req.payload.analyzers.map(getAnalyzerResult));
          res.resultAnalyzers.sort(
            function (a, b) {
              if (a.id < b.id) return -1;
              if (a.id > b.id) return 1;
              return 0;
            }
          );
          return res;
        } catch (error) {
          return convertEsError(param.index, error);
        }
      } else {
        return res;
      }
    }
  });
}
