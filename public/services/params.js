export function updateParamsWithEvent(event, params){
  const target = event.target;
  const value = target.type === 'checkbox' ? target.checked : target.value;
  const name = target.name;

  params[name] = value;
  return params;
};


export function updateParamsWithEventAndIndex(event, params){

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

export function selectTab(tab, params) {
  params["tab"] = tab.name;
  return params;
}

export function updateParamsWithRemoveRow(name, index, params){
  console.log("=== call updateParamsWithRemoveRow ===");
  console.log(" name:  "+name);
  console.log(" index:  "+index);
  console.log("=== end call updateParamsWithRemoveRow ===");
  if (params[name] && params[name].length > index) {
    params[name].splice(index, 1);
    console.log(params[name]);
  }
  return params;
}
