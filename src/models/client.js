import { query } from '@/services/client';
import { setClient, getClient } from '../utils/authority';


const ClientModel = {
  namespace: 'client',
  state: {},
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(query);
      yield put({
        type: 'save',
        payload: response,
      });
    },
  },
  reducers: {
    save(state, action) {
      setClient(action.payload);
      return { ...action.payload };
    },
  },
};
export default ClientModel;
