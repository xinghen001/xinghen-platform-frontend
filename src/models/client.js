import { getCurrentClient } from '../utils/auth';


export default {

  state: {
    currentClient: {},
  },

  effects: {
    *currentClient(_, { put }) {
      const client = getCurrentClient();
      yield put({
        type: 'saveClient',
        payload: client,
      });
    },
  },

  reducers: {
    saveClient(state, action) {
      return {
        ...state,
        currentClient: action.payload,
      };
    },
  },

};
