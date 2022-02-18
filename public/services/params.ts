export function updateParamsWithEvent(event: any, params: any) {
  const target = event.target;
  const value = target.type === 'checkbox' || target.name === 'showAllTokenAttr' ? target.checked : target.value;
  const name = target.name;
  params[name] = value;
  return params;
};

export function updateParamsWithEventAndIndex(event: any, params: any) {
  const index = event.target.getAttribute('data-index');
  const target = event.target;
  const value = target.type === 'checkbox' ? target.checked : target.value;
  const name = target.name;

  if (params[name] == null) {
    params[name] = [];
  }
  params[name][index] = value;
  return params;
};

export function selectTab(tab: any, params: any) {
  params["tab"] = tab.name;
  return params;
}
