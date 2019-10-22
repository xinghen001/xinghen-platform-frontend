import { query } from '@/services/client';
import { setClient, getClient } from '../utils/authority';


const ClientModel = {
  namespace: 'client',
  state: {},
  effects: {
    * fetch(_, { call, put }) {
      let currentClient = getClient();
      if (!currentClient || !currentClient.id) {
        const response = yield call(query);
        if (response.success) {
          currentClient = response.data;
        }
      }
      yield put({
        type: 'save',
        payload: currentClient || {},
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
