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
            name: 'analysis',
            path: '/dashboard/analysis',
          },
          {
            id: 3,
            code: 'monitor',
            name: 'monitor',
            path: '/dashboard/monitor',
          },
          {
            id: 4,
            code: 'workplace',
            name: 'workplace',
            path: '/dashboard/workplace',
          },
        ],
      },
    ],
  },
};
