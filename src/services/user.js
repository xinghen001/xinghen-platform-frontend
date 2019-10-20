// import { stringify } from 'qs';
import request from '../utils/request';
import func from '../utils/Func';

/**
 * 用户登录
 * @param params
 * @returns {Promise<*>}
 */
export async function accountLogin(params) {
  return request('/api/user/login', {
    method: 'POST',
    body: func.toFormData(params),
  });
}

/**
 * 获取当前用户信息
 * @returns {Promise<*>}
 */
export async function currentUser() {
  return request('/api/user/current');
}
