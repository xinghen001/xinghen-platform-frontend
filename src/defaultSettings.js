module.exports = {
  navTheme: 'dark', // theme for nav menu
  primaryColor: '#1890FF', // primary color of ant design
  layout: 'sidemenu', // nav menu position: sidemenu or topmenu
  contentWidth: 'Fluid', // layout of content: Fluid or Fixed, only works when layout is topmenu
  fixedHeader: true, // sticky header
  autoHideHeader: false, // auto hide header
  fixSidebar: true, // sticky sidebar
  collapse: true,
  menu: {
    disableLocale: false,
  },
  pwa: true,

  title: '工程效率平台',
  copyright: '2019 Xinghen',
  sso: false,
  login_url: 'http://localhost:8888/ssoLogin.htm',
  logout_url: '',
};
