import request from '@/utils/request';

export async function accountLogin(params) {
  return request('/api/account/login', {
    method: 'POST',
    data: params,
  });
}

export async function ssoLogin(params) {
  return request('/api/account/ssoLogin', {
    method: 'POST',
    data: params,
  });
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
