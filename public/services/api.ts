let httpClient;
export const setHttpClient = (client) => {
  httpClient = client;
};
export const getHttpClient = () => {
  return httpClient;
};

export async function analyze(params) {
  return await httpClient.post('/api/analyze_api_ui/analyze', {body: JSON.stringify(params)});
}

export async function multiAnalyze(params) {
  return await httpClient.post('/api/analyze_api_ui/multi_analyze', {body: JSON.stringify(params)});
}
