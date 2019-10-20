import request from '../utils/request';


export async function queryError(code) {
  return request(`/api/${code}`);
}
