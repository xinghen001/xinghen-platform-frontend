function getFakeMenus(req, res) {
  const json = { code: 200, success: true, msg: '操作成功' };
  json.data = [
    {
      path: '/desk',
      code: 'desk',
      name: '工作台',
      source: 'desktop',
      children: [
        {
          path: '/desk/notice',
          code: 'notice',
          name: '通知公告',
        },
      ],
    },
  ];
  return res.json(json);
}

const proxy = {
  'GET /api/menu/all': getFakeMenus,
};

export default proxy;
