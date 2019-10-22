import { queryCurrent } from '@/services/user';
import { setCurrentUser } from '../utils/authority';


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
      const { payload } = action;
      setCurrentUser(payload);
      return { ...state, currentUser: payload || {} };
    },
  },
};
export default UserModel;
