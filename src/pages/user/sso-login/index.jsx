import React, { Component } from 'react';
import Link from 'umi/link';
import { connect } from 'dva';
import { Button, Result } from 'antd';
import { getPageQuery } from '@/utils/utils';
import defaultSettings from '../../../../config/defaultSettings';
import PageLoading from '@/components/PageLoading';
import styles from './style.less';

@connect(({ login, loading }) => ({
  status: login.status,
  loading: loading.effects['login/ssoLogin'],
}))
export default class SsoLogin extends Component {

  state = {
    type: 'account',
    isReady: false,
  };

  componentDidMount() {
    const params = getPageQuery();
    const { type } = this.state;
    const { ssoToken } = params;
    if (ssoToken) {
      const { dispatch } = this.props;
      if (dispatch) {
        dispatch({
          type: 'login/ssoLogin',
          payload: { token: ssoToken, type },
        });
      }
    }
    this.setState({
      isReady: true,
    });
  }

  render() {
    const { isReady } = this.state;
    const { loading, status } = this.props;
    console.log(this.props);
    if ((!status && !isReady) || loading) {
      return <PageLoading />;
    }
    if (!status) {
      const { ssoLoginUrl } = defaultSettings;
      window.location.href = ssoLoginUrl;
      return null;
    }
    const actions = (
      <div className={styles.actions}>
        <Link to="/">
          <Button size="large">返回首页</Button>
        </Link>
      </div>
    );
    return (
      <Result
        className={styles.ssoLogin}
        status="success"
        title={<div className={styles.title}>您已登录成功</div>}
        extra={actions}
      />
    );
  }
}
