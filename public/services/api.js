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
  const body = {
    params
  };
  const response = await httpClient.post(`${apiPrefix}/analyze`, body);
  return {
    detail: response.data.detail,
    esRequest: response.data.request,
  };
}

export async function multiAnalyze(params) {
  const body = {
    params
  };
  const response = await httpClient.post(`${apiPrefix}/multi_analyze`, body);
  return {
    resultAnalyzers: response.data.resultAnalyzers
  };
}