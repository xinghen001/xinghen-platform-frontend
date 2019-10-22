import ProLayout, { DefaultFooter } from '@ant-design/pro-layout';
import React from 'react';
import Link from 'umi/link';
import { connect } from 'dva';
import { Icon } from 'antd';
import Authorized from '@/utils/Authorized';
import RightContent from '@/components/GlobalHeader/RightContent';
import logo from '../assets/logo.svg';

/**
 * 校验权限
 * @param menuList
 * @returns {*}
 */
const menuDataRender = menuList =>
  menuList.map(item => {
    const localItem = { ...item, children: item.children ? menuDataRender(item.children) : [] };
    return Authorized.check(item.authority, localItem, null);
  });

class BasicLayout extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'settings/getSetting',
      });
      dispatch({
        type: 'client/fetch',
      });
      dispatch({
        type: 'user/fetchCurrent',
      });
    }
  }

  handleMenuCollapse = payload => {
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
    }
  };

  render() {
    const { children, settings, client, currentUser } = this.props;
    const {
      title,
      copyright,
      gitLab,
    } = client;
    const footerRender = () => {
      const links = [];
      if (gitLab) {
        links.push({
          key: 'gitlab',
          title: <Icon type="gitlab"/>,
          href: { gitLab },
          blankTarget: true,
        });
      }
      return (
        <DefaultFooter
          copyright={copyright}
          links={links}
        />
      );
    };

    return (
      <>
        <ProLayout
          title={title || settings.defaultTitle}
          logo={logo}
          onCollapse={this.handleMenuCollapse}
          menuItemRender={(menuItemProps, defaultDom) => {
            if (menuItemProps.isUrl) {
              return defaultDom;
            }

            return <Link to={menuItemProps.path}>{defaultDom}</Link>;
          }}
          breadcrumbRender={(routers = []) => [
            {
              path: '/',
              breadcrumbName: '首页',
            },
            ...routers,
          ]}
          itemRender={(route, params, routes, paths) => {
            const first = routes.indexOf(route) === 0;
            return first ? (
              <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
            ) : (
              <span>{route.breadcrumbName}</span>
            );
          }}
          footerRender={footerRender}
          menuDataRender={menuDataRender}
          rightContentRender={() => <RightContent {...currentUser} {...client} />}
          {...this.props}
          {...settings}
        >
          {children}
        </ProLayout>
      </>
    );
  }
}

export default connect(({ global, settings, client, user }) => ({
  collapsed: global.collapsed,
  settings,
  client,
  currentUser: user.currentUser,
}))(BasicLayout);
