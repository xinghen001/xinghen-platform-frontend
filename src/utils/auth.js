const TOKEN_KEY = 'e-token';
const MENU_KEY = 'e-menu';
const CLIENT_KEY = 'e-current-client';
const USER_KEY = 'e-current-user';
const AUTH_KEY = 'e-authority';

/**
 * 清除缓存
 */
export function removeAll() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(MENU_KEY);
  localStorage.removeItem(CLIENT_KEY);
  localStorage.removeItem(USER_KEY);
}

/**
 * 从缓存中获取token值
 * @returns {string}
 */
export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

/**
 * 把token存储到缓存中
 * @param token
 */
export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

/**
 * 从缓存中获取菜单列表
 * @returns {any | Array}
 */
export function getMenus() {
  return JSON.parse(localStorage.getItem(MENU_KEY)) || [];
}

/**
 * 把菜单列表存储到缓存中
 * @param menus
 */
export function setMenus(menus) {
  localStorage.setItem(MENU_KEY, JSON.stringify(menus));
}

/**
 * 获取当前客户端
 * @returns {any | {}}
 */
export function getCurrentClient() {
  return JSON.parse(localStorage.getItem(CLIENT_KEY)) || {};
}

/**
 * 把当前客户端设置到缓存中
 * @param client
 */
export function setCurrentClient(client) {
  localStorage.setItem(CLIENT_KEY, JSON.stringify(client));
}

/**
 * 获取当前用户信息
 * @returns {any | {}}
 */
export function getCurrentUser() {
  return JSON.parse(localStorage.getItem(USER_KEY)) || {};
}

/**
 * 把当前用户设置到缓存中
 * @param client
 */
export function setCurrentUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

/**
 * TODO: 获取当前用户权限
 * @returns {string}
 */
export function getAuthority(str) {
  const authorityString =
    typeof str === 'undefined' ? localStorage.getItem(AUTH_KEY) : str;
  // authorityString could be admin, "admin", ["admin"]
  let authority;
  try {
    authority = JSON.parse(authorityString);
  } catch (e) {
    authority = authorityString;
  }
  if (typeof authority === 'string') {
    return [authority];
  }
  return authority || ['guest'];
}
