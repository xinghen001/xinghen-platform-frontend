import exception from './en-US/exception';
import login from './en-US/login';
import component from './en-US/component';
import menu from './en-US/menu';

export default {
  'navBar.lang': 'Languages',
  'layout.user.link.help': 'Help',
  'layout.user.link.privacy': 'Privacy',
  'layout.user.link.terms': 'Terms',
  ...login,
  ...menu,
  ...component,
  ...exception,
};
