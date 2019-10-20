function getFakeClient(req, res) {
  const json = { code: 200, success: true, msg: '操作成功' };
  json.data = {
    title: '测试工程效率平台',
    phone: '0752-268888888',
    owner: 'xxx',
    docUrl: '',
    copyright: '2020 xinghen',
  };
  return res.json(json);
}

const proxy = {
  'GET /api/client/current': getFakeClient,
};

export default proxy;
