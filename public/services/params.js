export function initializeParams() {
  const params = {

  }
  return params;
}

export function updateParamsWithEvent(event, params){
  const target = event.target;
  const value = target.type === 'checkbox' ? target.checked : target.value;
  const name = target.name;

  params[name] = value;
  return params;
};


export function updateParamsWithEventAndIndex(event, params){

  console.log("onChange:");
  console.log(event.target.value);
  console.log(event.target.name);
  const index = event.target.getAttribute('data-index');
  console.log("data-index:"+index);
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
  console.log("selectTab:"+tab.name);
  params["tab"] = tab.name;
  return params;
}



