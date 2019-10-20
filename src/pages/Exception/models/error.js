import { queryError } from '@/services/api';


export default {

  namespace: 'error',

  state: {
    error: '',
    isLoading: false,
  },

  effects: {
    *query({ payload }, { call, put }) {
      yield call(queryError, payload);
      yield put({
        type: 'trigger',
        payload,
      });
    },
  },

  reducers: {
    trigger(state, action) {
      return {
        error: action.payload,
      }
    },
  },

};
