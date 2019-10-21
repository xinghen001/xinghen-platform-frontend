import { queryCurrent } from '@/services/user';

const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
  },
  effects: {
    * fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      if (response.success) {
        const { data } = response;
        yield put({
          type: 'saveCurrentUser',
          payload: data,
        });
      }
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },
  },
};
export default UserModel;
