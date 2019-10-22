import { DefaultFooter, getMenuData, getPageTitle } from '@ant-design/pro-layout';
import DocumentTitle from 'react-document-title';
import Link from 'umi/link';
import React from 'react';
import { connect } from 'dva';
import { getClient } from '../utils/authority';
import logo from '../assets/logo.svg';
import styles from './UserLayout.less';

const { title, desc, copyright } = getClient();

const UserLayout = props => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  const { breadcrumb } = getMenuData(routes);
  return (
    <DocumentTitle
      title={getPageTitle({
        title: title,
        pathname: location.pathname,
        breadcrumb,
        ...props,
      })}
    >
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <span className={styles.title}>{title}</span>
              </Link>
            </div>
            <div className={styles.desc}>{desc}</div>
          </div>
          {children}
        </div>
        <DefaultFooter copyright={copyright} links={[]}/>
      </div>
    </DocumentTitle>
  );
};

export default connect(({ settings }) => ({ ...settings }))(UserLayout);
