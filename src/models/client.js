import { query } from '@/services/client';
import { setClient } from '../utils/authority';


const ClientModel = {
  namespace: 'client',
  state: {},
  effects: {
    * fetch(_, { call, put }) {
      const response = yield call(query);
      if (response.success) {
        const { data } = response;
        yield put({
          type: 'save',
          payload: data,
        });
      }
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
