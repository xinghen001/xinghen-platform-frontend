import { getCurrentUser } from '../utils/auth';


export default {

  state: {
    currentUser: {},
  },

  effects: {
    *currentUser(_, { put }) {
      const currentUser = getCurrentUser();
      yield put({
        type: 'saveCurrentUser',
        payload: currentUser,
      });
    },
  },

  reducers: {
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
  },

};
