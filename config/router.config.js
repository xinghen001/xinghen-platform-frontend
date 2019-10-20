export default [
  {
    path: '/login',
    redirect: '/user/login'
  },
  {
    path: '/ssoLogin.htm',
    redirect: '/user/login-after'
  },
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user/login', component: './Login/Login' },
      { path: '/user/login-after', component: './Login/LoginResult' },
    ],
  },
  {
    path: '/',
    component: '../layouts/BasicLayout',
    // Routes: ['src/pages/Authorized'],
    // authority: [],
    routes: [
      { path: '/', redirect: '/dashboard/workplace' },
      {
        path: '/exception',
        routes: [
          // exception
          { path: '/exception/trigger', component: './Exception' },
          { path: '/exception/403', component: './Exception/403' },
          { path: '/exception/404', component: './Exception/404' },
          { path: '/exception/500', component: './Exception/500' },
        ],
      },
      {
        component: './Exception/404',
      },
    ],
  },
];
