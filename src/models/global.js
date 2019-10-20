export const GLOBAL_NAMESPACE = 'global';

export default {
  namespace: GLOBAL_NAMESPACE,

  state: {
    collapsed: false,
  },

  reducers: {
    changeLayoutCollapsed(state, { payload }) {
      return {
        ...state,
        collapsed: payload,
      };
    },
  },

};
