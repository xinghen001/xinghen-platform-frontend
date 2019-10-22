import { routerRedux } from 'dva/router';
import { stringify } from 'querystring';
import { fakeAccountLogin, getFakeCaptcha } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { removeAll, setToken } from '../utils/authority';
import defaultSettings from '../../config/defaultSettings';

const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    // 登录
    * login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });

      if (response.success) {
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

    // 单点登录
    * ssoLogin({ payload }, { call, put }) {
      const { token, type } = payload;
      setToken(token);
      yield put({
        type: 'changeLoginStatus',
        payload: {
          token,
          status: true,
          type,
        },
      });
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

    // 获取验证码
    * getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },

    // 退出登录
    * logout(_, { put }) {
      removeAll();
      const { redirect } = getPageQuery();
      const queryString = stringify({ redirect: window.location.href });
      const { ssoEnabled, ssoLoginUrl } = defaultSettings;
      if (ssoEnabled && ssoLoginUrl) {
        window.location.href = `${ssoLoginUrl}?${queryString}`;
        return;
      }
      if (window.location.pathname !== '/user/login' && !redirect) {
        yield put(
          routerRedux.replace({
            pathname: '/user/login',
            search: queryString,
          }),
        );
      }
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      setToken(payload.token);
      return { ...state, status: payload.status, type: payload.type };
    },
  },
};
export default Model;
