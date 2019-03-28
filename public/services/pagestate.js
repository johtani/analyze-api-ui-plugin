const storage = require('./storage');

const pagestate = {

  updateCurrentState(content) {
    const timestamp = new Date().getTime();
    storage.set("page_state", {
      time: timestamp,
      content: content
    });
  },

  getSavedEditorState() {
    const saved = storage.get('page_state');
    if (!saved) return;
    const { time, content } = saved;
    return { time, content };
  }

};

export default pagestate;
