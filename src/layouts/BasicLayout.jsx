import ProLayout, { DefaultFooter } from '@ant-design/pro-layout';
import React from 'react';
import Link from 'umi/link';
import { connect } from 'dva';
import { Icon } from 'antd';
import Authorized from '@/utils/Authorized';
import RightContent from '@/components/GlobalHeader/RightContent';
import { getClient } from '@/utils/authority';
import { getCurrentUser } from '../utils/authority';
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
    const { dispatch, children, settings } = this.props;
    const {
      title,
      copyright,
      docUrl,
      gitLab,
    } = getClient();
    const footerRender = () => {
      const links = [];
      if (gitLab) {
        links.push({
          key: 'gitlab',
          title: <Icon type="gitlab" />,
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
          rightContentRender={() => <RightContent {...getCurrentUser()} {...docUrl} />}
          {...this.props}
          {...settings}
        >
          {children}
        </ProLayout>
      </>
    );
  }
}

export default connect(({ global, settings }) => ({
  collapsed: global.collapsed,
  settings,
}))(BasicLayout);
