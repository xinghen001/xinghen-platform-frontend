export default {
  // 支持值为 Object 和 Array
  'GET /api/currentUser': (req, res) => {
    const token = req.headers['E-Auth'];
    res.send(req.headers);
    if (token) {
      res.send({
        code: 200,
        success: true,
        data: {
          id: 1,
          name: 'Serati Ma',
          avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
          userid: '00000001',
          email: 'antdesign@alipay.com',
          signature: '海纳百川，有容乃大',
          title: '交互专家',
          group: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
          notifyCount: 12,
          unreadCount: 11,
          country: 'China',
          geographic: {
            province: {
              label: '浙江省',
              key: '330000',
            },
            city: {
              label: '杭州市',
              key: '330100',
            },
          },
          address: '西湖区工专路 77 号',
          phone: '0752-268888888',
        },
      });
    } else {
      res.send({
        code: 401,
        success: false,
      })
    }
    return;
  },
};
