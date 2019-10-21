import request from '@/utils/request';

/**
 * 查询所有菜单列表
 * @returns {Promise<void>}
 */
export async function queryAll() {
  return request('/api/menu');
}
