import { convertEsError } from './handle_es_error';

export default function (server) {

  let call = server.plugins.elasticsearch.getCluster('data').callWithRequest;

  server.route({
    path: '/api/analyze-api-ui-plugin/analyze',
    method: 'POST',
    handler(req, reply) {

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
      call(req, 'indices.analyze', param)
        .then(function (response) {
          let res = {
            detail: response.detail,
            request: param.body
          }
          reply(res);
        })
        .catch(error => {
          reply(convertEsError(param.index, error));
        });
    }
  });

  server.route({
    path: '/api/analyze-api-ui-plugin/multi_analyze',
    method: 'POST',
    handler(req, reply) {

      // get params from req
      // call _analyze api
      let param = {
        body: {
          explain: false,
          text: req.payload.text
        }
      };
      if (req.payload.indexName) param.index = req.payload.indexName;
      var res = {
        resultAnalyzers: []
      };

      function getAnalyzerResult(analyzer) {
        return new Promise(function (resolve, reject) {
          param.body.analyzer = analyzer.item;
          call(req, 'indices.analyze', param)
            .then(function (response) {
              res.resultAnalyzers.push({analyzer: analyzer.item, id: analyzer.id, tokens: response.tokens});
              resolve(res);
            })
            .catch(error => {
              reject(convertEsError(param.index, error));
            });
        });
      };

      Promise.all(
        req.payload.analyzers.map(getAnalyzerResult))
        .then(function (response) {
          reply(res);
        })
        .catch(error => {
          reply(convertEsError(param.index, error));
        });
    }
  });


}
