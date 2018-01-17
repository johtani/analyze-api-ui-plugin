import pagestate from './pagestate';

const utils = {};

// initialize array
utils.initialItems = (size) => {
  const items = [];
  for (let i = 0; i < size; i++) {
    items.push({ 'item': '', 'id': i });
  }
  return items;
};

// initialize form values
utils.initializeFormValues = (scope) => {
  scope.formValues = {
    indexName: '',
    text: '',
    analyzer: '',
    tokenizer: '',
    charfilters: utils.initialItems(1),
    filters: utils.initialItems(1),
    field: '',
    analyzersForCompare: utils.initialItems(2)
  };
};

// load saved state from storage
utils.loadSavedState = (scope) => {
  const preState = pagestate.getSavedEditorState();

  if (preState) {
    scope.formValues = preState.content.formValues;
    scope.currentTab = preState.content.currentTab;
  } else {
    utils.initializeFormValues(scope);
    scope.currentTab = scope.services[0];
  }
};

// save state
utils.saveState = (scope) => {
  try {
    pagestate.updateCurrentState({
      currentTab: scope.currentTab,
      formValues: scope.formValues
    });
  } catch (e) {
    console.log("Ignoring saving error: " + e);
  }
};

export default utils;
