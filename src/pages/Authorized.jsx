import React from 'react';
import Redirect from 'umi/redirect';
import { connect } from 'dva';
import pathToRegexp from 'path-to-regexp';
import Authorized from '@/utils/Authorized';
import { getToken } from '@/utils/authority';
import defaultSettings from '../../config/defaultSettings';
import { stringify } from "querystring";

const getRouteAuthority = (path, routeData) => {
  let authorities;
  routeData.forEach(route => {
    if (route.authority) {
      authorities = route.authority;
    }

    if (pathToRegexp(`${route.path}(.*)`).test(path)) {
      // exact match
      if (route.path === path) {
        authorities = route.authority || authorities;
      } // get children authority recursively

      if (route.routes) {
        authorities = getRouteAuthority(path, route.routes) || authorities;
      }
    }
  });
  return authorities;
};

const AuthComponent = ({
                         children,
                         route = {
                           routes: [],
                         },
                         location = {
                           pathname: '',
                         },
                         user,
                       }) => {
  const { currentUser } = user;
  const { routes = [] } = route;
  const isLogin = getToken();
  const { ssoEnabled, ssoLoginUrl } = defaultSettings;
  const queryString = stringify({
    redirect: window.location.href,
  });

  if (!isLogin && ssoEnabled && ssoLoginUrl) {
    window.location.href = `${ssoLoginUrl}?${queryString}`;
    return null;
  }
  return (
    <Authorized
      authority={getRouteAuthority(location.pathname, routes) || ''}
      noMatch={isLogin ? <Redirect to="/exception/403" /> : <Redirect to="/user/login" />}
    >
      {children}
    </Authorized>
  );
};

export default connect(({ user }) => ({
  user,
}))(AuthComponent);
