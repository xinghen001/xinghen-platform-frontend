import React, { Component } from 'react';
import { connect } from 'dva';
import { FormattedMessage } from 'umi/locale';
import { Button } from 'antd';
import Link from 'umi/link';
import Result from '@/components/Result';
import { LOGIN_NAMESPACE } from '@/models/login';

import styles from './LoginResult.less';

@connect((login) => ({
  login,
}))
class LoginResult extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    const token = 'token';
    dispatch({
      type: `${LOGIN_NAMESPACE}/loginAfter`,
      payload: {
        token,
      },
    });
  }

  render() {

    const actions = (
      <div className={styles.actions}>
        <Link to="/">
          <Button size="large" type="primary">
            <FormattedMessage id="app.login-result.back-home" />
          </Button>
        </Link>
      </div>
    );

    return (
      <Result
        className={styles.loginResult}
        type="success"
        title={
          <div className={styles.title}>
            <FormattedMessage id="app.login-result.msg" />
          </div>
        }
        actions={actions}
        style={{ marginTop: 56 }}
      />
    );
  }
}

export default LoginResult;
