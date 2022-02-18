import instance from "./storage";

const pagestate = {

  updateCurrentState(content: { params: any; }) {
    const timestamp = new Date().getTime();
    instance.set("page_state", {
      time: timestamp,
      content: content
    });
  },

  getSavedEditorState() {
    const saved = instance.get('page_state', null);
    if (!saved) return;
    const { time, content } = saved;
    return { time, content };
  }

};

export default pagestate;
