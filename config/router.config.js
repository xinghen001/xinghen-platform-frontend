export default [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        name: '登录',
        path: '/user/login',
        component: './user/login',
      },
      {
        name: 'SSO登录',
        path: '/user/sso-login',
        component: './user/sso-login',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/SecurityLayout',
    routes: [
      {
        path: '/',
        component: '../layouts/BasicLayout',
        Routes: ['src/pages/Authorized'],
        authority: ['admin', 'user'],
        routes: [
          {
            path: '/',
            redirect: '/welcome',
          },
          {
            path: '/welcome',
            name: '欢迎',
            hideInMenu: true,
            icon: 'smile',
            component: './Welcome',
          },
          {
            path: '/exception',
            name: '异常页',
            hideInMenu: true,
            icon: 'smile',
            routes: [
              {
                name: '403',
                icon: 'smile',
                path: '/exception/403',
                component: './exception/403',
              },
              {
                name: '404',
                icon: 'smile',
                path: '/exception/404',
                component: './exception/404',
              },
              {
                name: '500',
                icon: 'smile',
                path: '/exception/500',
                component: './exception/500',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
];
