import chrome from 'ui/chrome';
let httpClient;
export const setHttpClient = (client) => {
  httpClient = client;
};
export const getHttpClient = () => {
  return httpClient;
};
const apiPrefix = chrome.addBasePath('/api/analyze_api_ui');

export async function analyze(params) {
  const response = await httpClient.post(`${apiPrefix}/analyze`, params);
  return response;
}

export async function multiAnalyze(params) {
  const response = await httpClient.post(`${apiPrefix}/multi_analyze`, params);
  return response;
}