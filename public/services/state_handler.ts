import pagestate from './pagestate';

export function initializeParams() {
  const params = {
    indexName: '',
    text: '',
    analyzer: '',
    tokenizer: '',
    charfilters: [],
    filters: [],
    field: '',
    analyzersForCompare: [],
    showAllTokenAttr: false,
  };
  return params;
}

  // load saved state from storage
export function loadSavedState() {
  const preState = pagestate.getSavedEditorState();
  let params;
  if (preState) {
    params = preState.content.params;
  } else {
    params = initializeParams();
  }
  return params;
}

  // save state
export function saveState(state) {
  try {
    pagestate.updateCurrentState({
      params: state.params
    });
  } catch (e) {
    console.log("Ignoring saving error: " + e);
  }
}
