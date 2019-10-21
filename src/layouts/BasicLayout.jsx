import ProLayout, { DefaultFooter, SettingDrawer } from '@ant-design/pro-layout';
import React from 'react';
import Link from 'umi/link';
import { connect } from 'dva';
import { Icon } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import Authorized from '@/utils/Authorized';
import RightContent from '@/components/GlobalHeader/RightContent';
import { getClient } from '@/utils/authority';
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
        type: 'user/fetchCurrent',
      });
      dispatch({
        type: 'menu/fetchMenuData',
      });
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
              breadcrumbName: formatMessage({
                id: 'menu.home',
                defaultMessage: 'Home',
              }),
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
          formatMessage={formatMessage}
          rightContentRender={rightProps => <RightContent {...rightProps} {...docUrl} />}
          {...this.props}
          {...settings}
        >
          {children}
        </ProLayout>
        <SettingDrawer
          settings={settings}
          onSettingChange={config =>
            dispatch({
              type: 'settings/changeSetting',
              payload: config,
            })
          }
        />
      </>
    );
  }
}

export default connect(({ global, menu, settings }) => ({
  collapsed: global.collapsed,
  menuData: menu.menuData,
  settings,
}))(BasicLayout);
