import { Alert, Checkbox, Icon } from 'antd';
import React, { Component } from 'react';
import { connect } from 'dva';
import LoginComponents from './components/Login';
import styles from './style.less';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = LoginComponents;

@connect(({ login, loading }) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))
class Login extends Component {
  loginForm = undefined;

  state = {
    type: 'account',
    autoLogin: true,
  };

  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  handleSubmit = (err, values) => {
    const { type } = this.state;

    if (!err) {
      const { dispatch } = this.props;
      dispatch({
        type: 'login/login',
        payload: { ...values, type },
      });
    }
  };

  onTabChange = type => {
    this.setState({
      type,
    });
  };

  onGetCaptcha = () =>
    new Promise((resolve, reject) => {
      if (!this.loginForm) {
        return;
      }

      this.loginForm.validateFields(['mobile'], {}, async (err, values) => {
        if (err) {
          reject(err);
        } else {
          const { dispatch } = this.props;

          try {
            const success = await dispatch({
              type: 'login/getCaptcha',
              payload: values.mobile,
            });
            resolve(!!success);
          } catch (error) {
            reject(error);
          }
        }
      });
    });

  renderMessage = content => (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );

  render() {
    const { userLogin, submitting } = this.props;
    const { status, type: loginType } = userLogin;
    const { type, autoLogin } = this.state;
    return (
      <div className={styles.main}>
        <LoginComponents
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          onCreate={form => {
            this.loginForm = form;
          }}
        >
          <Tab
            key="account"
            tab="账号登录"
          >
            {status === 'error' &&
            loginType === 'account' &&
            !submitting && '用户名或密码错误'}
            <UserName
              name="userName"
              placeholder="用户名"
              rules={[
                {
                  required: true,
                  message: '用户名不能为空',
                },
              ]}
            />
            <Password
              name="password"
              placeholder="密码"
              rules={[
                {
                  required: true,
                  message: '密码不能为空',
                },
              ]}
              onPressEnter={e => {
                e.preventDefault();

                if (this.loginForm) {
                  this.loginForm.validateFields(this.handleSubmit);
                }
              }}
            />
          </Tab>
          <Tab
            key="mobile"
            tab="手机号登录"
          >
            {status === 'error' &&
            loginType === 'mobile' &&
            !submitting && '验证码输入错误'}
            <Mobile
              name="mobile"
              placeholder="手机号"
              rules={[
                {
                  required: true,
                  message: '手机号不能为空',
                },
                {
                  pattern: /^1\d{10}$/,
                  message: '手机号格式错误',
                },
              ]}
            />
            <Captcha
              name="captcha"
              placeholder="验证码"
              countDown={120}
              onGetCaptcha={this.onGetCaptcha}
              getCaptchaButtonText="获取验证码"
              getCaptchaSecondText="刷新验证码"
              rules={[
                {
                  required: true,
                  message: '验证码不能为空',
                },
              ]}
            />
          </Tab>
          <div>
            <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
              自动登录
            </Checkbox>
            <a
              style={{
                float: 'right',
              }}
              href=""
            >
              忘记密码
            </a>
          </div>
          <Submit loading={submitting}>
            登录
          </Submit>
          <div className={styles.other}>
            其他登录方式
            <Icon type="alipay-circle" className={styles.icon} theme="outlined"/>
            <Icon type="taobao-circle" className={styles.icon} theme="outlined"/>
            <Icon type="weibo-circle" className={styles.icon} theme="outlined"/>
          </div>
        </LoginComponents>
      </div>
    );
  }
}

export default Login;
