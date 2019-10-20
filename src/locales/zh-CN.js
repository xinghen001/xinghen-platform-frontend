import exception from './zh-CN/exception';
import login from './zh-CN/login';
import component from './zh-CN/component';
import menu from './zh-CN/menu';

export default {
  'navBar.lang': '语言',
  'layout.user.link.help': '帮助',
  'layout.user.link.privacy': '隐私',
  'layout.user.link.terms': '条款',
  ...login,
  ...menu,
  ...component,
  ...exception,
};
