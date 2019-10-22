export default {
  'GET /api/menu': {
    code: 200,
    success: true,
    data: [
      {
        id: 1,
        code: 'dashboard',
        path: '/dashboard',
        name: '工作台',
        children: [
          {
            id: 2,
            code: 'analysis',
            name: '分析',
            path: '/dashboard/analysis',
          },
          {
            id: 3,
            code: 'monitor',
            name: '监控',
            path: '/dashboard/monitor',
          },
          {
            id: 4,
            code: 'workplace',
            name: '工作台',
            path: '/dashboard/workplace',
          },
        ],
      },
    ],
  },
};
