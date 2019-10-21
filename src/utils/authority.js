import store from 'store';
import { reloadAuthorized } from './Authorized'; // use localStorage to store the authority info, which might be sent from server in actual project.

const TOKEN_KEY = 'e-token';
const MENU_KEY = 'e-menu';
const CLIENT_KEY = 'e-current-client';
const USER_KEY = 'e-current-user';
const AUTH_KEY = 'e-authority';

/**
 * 从缓存中获取权限信息
 * @param str
 * @returns {*}
 */
export function getAuthority(str) {
  const authority = str === 'undefined' ? store.get(AUTH_KEY) : str;
  if (typeof authority === 'string') {
    return [authority];
  }
  if (!authority && ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return ['admin'];
  }
  return authority;
}

/**
 * 把权限信息设置到缓存中
 * @param authority
 */
export function setAuthority(authority) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  reloadAuthorized();
  return store.set(AUTH_KEY, proAuthority);
}

/**
 * 从缓存中获取token值
 * @returns {string}
 */
export function getToken() {
  return store.get(TOKEN_KEY);
}

/**
 * 把token存储到缓存中
 * @param token
 */
export function setToken(token) {
  store.set(TOKEN_KEY, token);
}

/**
 * 从缓存中获取菜单列表
 * @returns {any | Array}
 */
export function getMenus() {
  return store.get(MENU_KEY) || [];
}

/**
 * 把菜单列表存储到缓存中
 * @param menus
 */
export function setMenus(menus) {
  store.set(MENU_KEY, menus);
}

/**
 * 获取当前客户端
 * @returns {any | {}}
 */
export function getClient() {
  return store.get(CLIENT_KEY) || {};
}

/**
 * 把当前客户端设置到缓存中
 * @param client
 */
export function setClient(client) {
  store.set(CLIENT_KEY, client);
}

/**
 * 获取当前用户信息
 * @returns {any | {}}
 */
export function getCurrentUser() {
  return store.get(USER_KEY) || {};
}

/**
 * 把当前用户设置到缓存中
 * @param client
 */
export function setCurrentUser(user) {
  store.set(USER_KEY, user);
}

/**
 * 清除缓存
 */
export function removeAll() {
  store.clear();
}
