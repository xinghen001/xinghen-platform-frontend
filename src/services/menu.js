import request from '../utils/request';

/**
 * 获取所有菜单
 * @returns {*}
 */
export function getMenuList() {
  return request('/api/menu/all');
}
