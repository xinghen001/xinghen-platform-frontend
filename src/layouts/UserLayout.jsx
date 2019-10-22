import { DefaultFooter, getMenuData, getPageTitle } from '@ant-design/pro-layout';
import DocumentTitle from 'react-document-title';
import Link from 'umi/link';
import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './UserLayout.less';

class UserLayout extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    if (dispatch) {
      dispatch({
        type: 'client/fetch',
      });
    }
  }

  render() {
    const { route = { routes: [] } } = this.props;
    const { routes = [] } = route;
    const { children, location = { pathname: '' } } = this.props;
    const { breadcrumb } = getMenuData(routes);
    const { client } = this.props;
    const { title, desc, copyright } = client;
    return (
      <DocumentTitle
        title={getPageTitle({
          title,
          pathname: location.pathname,
          breadcrumb,
          ...this.props,
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
  }
}

export default connect(({ client, settings }) => ({
  client,
  ...settings,
}))(UserLayout);
