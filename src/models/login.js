import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { getPageQuery, formatMenus, isUrl } from '../utils/utils';
import { currentClient } from '../services/client';
import { accountLogin, currentUser } from '../services/user';
import { getMenuList } from '../services/menu';
import { removeAll, setCurrentClient, setCurrentUser, setMenus } from '../utils/auth';
import { sso, logout_url } from '../defaultSettings';

export const LOGIN_NAMESPACE = 'login';

export default {

  namespace: LOGIN_NAMESPACE,

  state: {
    status: undefined,
  },

  effects: {
    *login({payload}, {call, put}) {
      const response = yield call(accountLogin, payload);
      if (response && response.success) {
        const { data } = response;
        removeAll();
        // 获取客户端信息
        const responseClient = yield call(currentClient);
        // 获取菜单信息
        const responseMenu = yield call(getMenuList);
        yield put({
          type: 'changeLoginState',
          payload: {
            status: true,
            type: 'login',
            data: {
              client: responseClient.data,
              user: data,
              menus: responseMenu.data,
            },
          },
        });
        // 重定向
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        yield put(routerRedux.replace(redirect || '/'));
      }
    },
    *loginAfter(_, { call, put }) {
      removeAll();
      // 获取客户端信息
      const responseClient = yield call(currentClient);
      // 获取用户信息
      const responseUser = yield call(currentUser);
      // 获取菜单信息
      const responseMenu = yield call(getMenuList);
      yield put({
        type: 'changeLoginState',
        payload: {
          status: true,
          type: 'login',
          data: {
            client: responseClient.data,
            user: responseUser.data,
            menus: responseMenu.data,
          },
        },
      });
      // 重定向
      const urlParams = new URL(window.location.href);
      const params = getPageQuery();
      let { redirect } = params;
      if (redirect) {
        const redirectUrlParams = new URL(redirect);
        if (redirectUrlParams.origin === urlParams.origin) {
          redirect = redirect.substr(urlParams.origin.length);
          if (redirect.match(/^\/.*#/)) {
            redirect = redirect.substr(redirect.indexOf('#') + 1);
          }
        } else {
          window.location.href = redirect;
          return;
        }
      }
      yield put(routerRedux.replace(redirect || '/'));
    },

    *logout(_, { put }) {
      yield put({
        type: 'changeLoginState',
        payload: {
          status: false,
          type: 'logout',
        },
      });
      if (sso && logout_url) {
        const urlParams = new URL(window.location.href);
        if (logout_url && isUrl(logout_url)) {
          const logoutUrlParams = new URL(logout_url);
          if (logoutUrlParams.origin === urlParams.origin) {
            let resultUrl = logout_url;
            resultUrl = resultUrl.substr(urlParams.origin.length);
            if (resultUrl.match(/^\/.*#/)) {
              resultUrl = logout_url.substr(logout_url.indexOf('#') + 1);
            }
          } else {
            window.location.href = logout_url;
            return;
          }
        }
        yield put(routerRedux.replace(logout_url || '/'));
      } else {
        yield put(
          routerRedux.push({
            pathname: '/login',
            search: stringify({
              redirect: window.location.href,
            }),
          })
        );
      }
    },
  },

  reducers: {
    /**
     * 保存信息到缓存
     * @param state
     * @param payload
     */
    changeLoginState(state, { payload }) {
      const { status, type } = payload;
      if (status) {
        const { data: {client, user, menus} } = payload;
        setCurrentClient(client);
        setCurrentUser(user);
        setMenus(formatMenus(menus));
      } else {
        removeAll();
      }
      return {
        ...state,
        status: type === 'login' ? (status ? 'ok' : 'error') : '',
        type: payload.type,
      };
    },
  },

};
