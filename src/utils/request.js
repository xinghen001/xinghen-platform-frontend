/**
 * request 网络请求工具
 *
 */
import fetch from 'dva/fetch';
import router from 'umi/router';
import { Base64 } from 'js-base64';
import hash from 'hash.js';
import { notification } from 'antd';
import { getClient, getToken, removeAll } from './authority';

export const loginPath = '/login';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
/**
 * 异常处理程序
 */

const errorHandler = error => {
  const { response } = error;

  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }

  return response;
};

/**
 * 检查状态
 * @param response
 * @returns {*}
 */
const checkStatus = response => {
  if (
    (response.status >= 200 && response.status < 300) ||
    // 针对于要显示后端返回自定义详细信息的status, 配置跳过
    (response.status === 400 || response.status === 500)
  ) {
    return response;
  }
  const errText = codeMessage[response.status] || response.statusText;
  notification.error({
    message: `请求错误 ${response.status}: ${response.url}`,
    description: errText,
  });
  const error = new Error(errText);
  error.name = response.status;
  error.response = response;
  throw error;
};

/**
 * 缓存
 * @param response
 * @param hashcode
 * @returns {*}
 */
const cachedSave = (response, hashcode) => {
  const contentType = response.headers.get('Content-Type');
  if (contentType && contentType.match(/application\/json/i)) {
    response
      .clone()
      .text()
      .then(content => {
        sessionStorage.setItem(hashcode, content);
        sessionStorage.setItem(`${hashcode}:timestamp`, Date.now());
      });
  }
  return response;
};

/**
 * 重定向
 * @param url
 */
function redirect(url) {
  let resultUrl = url;
  const currentUrlParams = new URL(window.location.href);
  const urlParams = new URL(resultUrl);
  if (urlParams.origin === currentUrlParams.origin) {
    resultUrl = resultUrl.substr(urlParams.origin.length);
    if (resultUrl.match(/^\/.*#/)) {
      resultUrl = resultUrl.substr(resultUrl.indexOf('#') + 1);
    }
    router.push(resultUrl);
  } else {
    window.location.href = url;
  }
}

/**
 * 检查返回状态码
 * @param response
 * @returns {*}
 */
const checkServerCode = response => {
  if (response.code >= 200 && response.code < 300) {
    return response;
  }
  if (response.code === 400) {
    notification.error({
      message: response.msg || codeMessage[response.code],
    });
  } else if (response.code === 401) {
    if (window.location.hash.endsWith(loginPath)) return false;
    notification.error({
      message: response.msg || codeMessage[response.code],
    });
    removeAll();
    redirect(loginPath);
  } else if (response.code === 404) {
    notification.error({
      message: response.msg || codeMessage[response.code],
    });
  } else if (response.code === 500) {
    notification.error({
      message: response.msg || codeMessage[response.code],
    });
  }
  return response;
};

/**
 * 封装请求方法
 * @param url
 * @param option
 * @param secured
 * @returns {*}
 */
export default function request(url, option, secured = true) {

  const options = { ...options };
  const fingerprint = url + (options.body ? JSON.stringify(options.body) : '');
  const hashcode = hash.sha256().update(fingerprint).digest('hex');
  const newOptions = { credentials: 'include', ...options };
  if (secured) {
    // 客户端认证
    const { clientId, clientSecret } = getClient();
    newOptions.headers = {
      ...newOptions.headers,
      Authorization: `Basic ${Base64.encode(`${clientId}:${clientSecret}`)}`,
    };
  }
  // 获取token，鉴权
  const token = getToken();
  if (token) {
    newOptions.headers = {
      ...newOptions.headers,
      'E-Auth': token,
    };
  }
  if (newOptions.method in ['POST', 'PUT', 'DELETE', 'post', 'put', 'delete']) {
    newOptions.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
      ...newOptions.headers,
    };
    newOptions.body = JSON.stringify(newOptions.body);
  } else {
    newOptions.headers = {
      Accept: 'application/json',
      ...newOptions.headers,
    };
  }

  const expires = options.expires && 60;
  if (options.expires !== false) {
    const cached = sessionStorage.getItem(hashcode);
    const whenCached = sessionStorage.getItem(`${hashcode}:timestamp`);
    if (cached !== null && whenCached !== null) {
      const age = (Date.now() - whenCached) / 1000;
      if (age < expires) {
        const response = new Response(new Blob([cached]));
        return response.json();
      }
      sessionStorage.removeItem(hashcode);
      sessionStorage.removeItem(`${hashcode}:timestamp`);
    }
  }

  return fetch(url, newOptions).then(checkStatus)
    .then(response => cachedSave(response, hashcode))
    .then(response => {
      if (newOptions.method === 'DELETE' || response.status === 204) {
        return response.text();
      }
      return response.json();
    })
    .then(checkServerCode)
    .catch(e => {
      const status = e.name;
      if (status === 401) {
        // @HACK
        /* eslint-disable no-underscore-dangle */
        window.g_app._store.dispatch({
          type: 'login/logout',
        });
        return;
      }
      // environment should not be used
      if (status === 403) {
        router.push('/exception/403');
        return;
      }
      if (status <= 504 && status >= 500) {
        if (window.location.href.indexOf(loginPath) < 0) {
          router.push('/exception/500');
        }
      }
    });
}
