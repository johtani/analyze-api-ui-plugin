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
      if (req.payload.filters) param.body.filter = req.payload.filters;
//console.log(param);
//console.log('indexName:' + param.index);

      call(req, 'indices.analyze',param).then(function (response) {
        reply(response.detail);
      });
    }
  });

}
