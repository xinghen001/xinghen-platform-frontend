// import { stringify } from 'qs';
import request from '../utils/request';

/**
 * 获取当前客户端信息
 * @returns {Promise<*>}
 */
export async function currentClient() {
  return request('/api/client/current');
}
