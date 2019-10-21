import { queryAll } from '@/services/menu';
import { setMenus } from '../utils/authority';
import { formatMenus } from '../utils/utils';


const MenuModel = {
  namespace: 'menu',
  state: {
    menuData: [],
  },

  effects: {
    * fetchMenuData(_, { call, put }) {
      const response = yield call(queryAll);
      if (response.success) {
        const { data } = response;
        // const menuData = formatMenus(data);
        const menuData = data;
        setMenus(menuData);
        yield put({
          type: 'save',
          payload: { menuData },
        });
      }
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },

};

export default MenuModel;
